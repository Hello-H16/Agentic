const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.generateResponse = async (message, conversationHistory = []) => {
  try {
    const messages = [
      { role: 'system', content: 'You are a helpful AI assistant.' },
      ...conversationHistory.map(msg => ({ role: msg.role, content: msg.content })),
      { role: 'user', content: message }
    ];

    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024
    });

    return completion.choices[0]?.message?.content || 'No response generated';
  } catch (err) {
    console.error('Groq API error:', err);
    return 'Sorry, I encountered an error processing your request.';
  }
};
