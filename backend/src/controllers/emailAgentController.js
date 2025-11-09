const Agent = require('../models/Agent');

exports.createEmailAgent = async (req, res) => {
  try {
    const emailAgent = new Agent({
      userId: req.userId,
      name: 'Email Sender Agent',
      description: 'Automatically sends emails via SendGrid',
      type: 'email',
      systemPrompt: 'You are an email sending agent. Parse email details and send them.',
      capabilities: ['send_email', 'parse_email']
    });
    await emailAgent.save();
    res.json(emailAgent);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getEmailTemplates = async (req, res) => {
  const templates = [
    { name: 'Meeting Invitation', template: 'To: {{email}}\nSubject: Meeting Invitation\nBody: Hi, I would like to invite you to a meeting on {{date}} at {{time}}.' },
    { name: 'Follow Up', template: 'To: {{email}}\nSubject: Follow Up\nBody: Hi, I wanted to follow up on our previous conversation about {{topic}}.' },
    { name: 'Thank You', template: 'To: {{email}}\nSubject: Thank You\nBody: Thank you for {{reason}}. We appreciate your time and effort.' }
  ];
  res.json(templates);
};
