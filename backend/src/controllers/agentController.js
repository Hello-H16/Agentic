const Agent = require('../models/Agent');

exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find({ userId: req.userId });
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createAgent = async (req, res) => {
  try {
    const { name, role, systemPrompt, description, type, model, temperature, maxTokens } = req.body;
    const agent = new Agent({ 
      userId: req.userId, 
      name, 
      role: role || type, 
      systemPrompt,
      description,
      type,
      model,
      temperature,
      maxTokens
    });
    await agent.save();
    res.json(agent);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteAgent = async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Agent deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
