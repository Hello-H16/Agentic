const Workflow = require('../models/Workflow');
const Task = require('../models/Task');
const Agent = require('../models/Agent');
const llmService = require('../services/llmService');

exports.getWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find({ userId: req.userId }).populate('steps.agentId');
    res.json(workflows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createWorkflow = async (req, res) => {
  try {
    const { name, description, steps } = req.body;
    console.log('Creating workflow:', { name, description, steps });
    const workflow = new Workflow({ userId: req.userId, name, description, steps });
    await workflow.save();
    res.json(workflow);
  } catch (err) {
    console.error('Workflow creation error:', err);
    res.status(500).json({ message: 'Server error', error: err.message, stack: err.stack });
  }
};

exports.updateWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(workflow);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteWorkflow = async (req, res) => {
  try {
    await Workflow.findByIdAndDelete(req.params.id);
    res.json({ message: 'Workflow deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.executeWorkflow = async (req, res) => {
  try {
    const { input } = req.body;
    const workflow = await Workflow.findById(req.params.id).populate('steps.agentId');
    
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    const task = new Task({
      userId: req.userId,
      workflowId: workflow._id,
      name: `${workflow.name} - ${new Date().toLocaleString()}`,
      input,
      status: 'running',
      steps: workflow.steps.map(step => ({
        agentId: step.agentId,
        status: 'pending'
      }))
    });
    await task.save();

    res.json({ task, message: 'Workflow execution started' });

    executeWorkflowAsync(workflow, task, input);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

async function executeWorkflowAsync(workflow, task, input) {
  const emailService = require('../services/emailService');
  let currentInput = input;

  for (let i = 0; i < workflow.steps.length; i++) {
    const step = workflow.steps[i];
    task.steps[i].status = 'running';
    task.steps[i].startedAt = new Date();
    task.steps[i].input = currentInput;
    await task.save();

    try {
      const agent = await Agent.findById(step.agentId);
      
      if (agent.type === 'email' || step.instruction.toLowerCase().includes('send email')) {
        const emailData = emailService.parseEmailFromText(currentInput);
        const result = await emailService.sendEmail(
          emailData.to,
          emailData.subject,
          emailData.body
        );
        const output = result.success 
          ? `Email sent successfully to ${emailData.to}` 
          : `Failed to send email: ${result.error}`;
        
        task.steps[i].output = output;
        currentInput = output;
      } else {
        const prompt = `${agent.systemPrompt}\n\nTask: ${step.instruction}\n\nInput: ${currentInput}`;
        const output = await llmService.generateResponse(prompt);
        task.steps[i].output = output;
        currentInput = output;
      }

      task.steps[i].status = 'completed';
      task.steps[i].completedAt = new Date();
    } catch (err) {
      task.steps[i].status = 'failed';
      task.status = 'failed';
      await task.save();
      return;
    }

    await task.save();
  }

  task.output = currentInput;
  task.status = 'completed';
  task.completedAt = new Date();
  await task.save();
}
