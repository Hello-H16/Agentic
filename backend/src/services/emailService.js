const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (to, subject, text, html) => {
  try {
    if (!to) {
      return { success: false, error: 'No recipient email found' };
    }
    
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yourdomain.com',
      subject,
      text,
      html: html || text
    };

    console.log('Sending email:', msg);
    await sgMail.send(msg);
    return { success: true, message: 'Email sent successfully' };
  } catch (err) {
    console.error('SendGrid error:', err.response?.body || err.message);
    return { success: false, error: err.response?.body?.errors?.[0]?.message || err.message };
  }
};

exports.parseEmailFromText = (text) => {
  const toRegex = /To:\s*([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i;
  const subjectRegex = /Subject:\s*(.+?)(?=\n|Body:|$)/is;
  const bodyRegex = /Body:\s*([\s\S]+)/i;
  
  const toMatch = text.match(toRegex);
  const subjectMatch = text.match(subjectRegex);
  const bodyMatch = text.match(bodyRegex);
  
  console.log('Parsing email:', { to: toMatch?.[1], subject: subjectMatch?.[1], body: bodyMatch?.[1] });
  
  return {
    to: toMatch ? toMatch[1].trim() : null,
    subject: subjectMatch ? subjectMatch[1].trim() : 'No Subject',
    body: bodyMatch ? bodyMatch[1].trim() : text
  };
};
