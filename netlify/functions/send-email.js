import { Resend } from 'resend';

export const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const { RESEND_API_KEY } = process.env;
  const resend = new Resend(RESEND_API_KEY);

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'ritikshah1206@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="background-color: #050505; color: #e5e7eb; font-family: 'Inter', system-ui, sans-serif; padding: 40px 20px; border-radius: 24px;">
          <div style="max-width: 600px; margin: 0 auto; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 32px; padding: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            <div style="margin-bottom: 32px;">
              <p style="font-family: monospace; color: #10b981; text-transform: uppercase; letter-spacing: 0.3em; font-size: 10px; margin-bottom: 12px;">// Incoming_Transmission</p>
              <h1 style="font-size: 32px; font-weight: 800; letter-spacing: -0.04em; margin: 0; color: #ffffff;">NEW <span style="color: #94a3b8; font-style: italic;">MESSAGE.</span></h1>
            </div>
            
            <div style="margin-bottom: 32px; padding: 24px; background: rgba(255, 255, 255, 0.02); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.05);">
              <div style="margin-bottom: 20px;">
                <p style="font-family: monospace; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; font-size: 9px; margin-bottom: 4px;">Source_Identity</p>
                <p style="font-size: 16px; font-weight: 600; margin: 0; color: #10b981;">${name}</p>
                <p style="font-size: 14px; color: #94a3b8; margin: 2px 0 0 0;">${email}</p>
              </div>
              
              <div>
                <p style="font-family: monospace; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; font-size: 9px; margin-bottom: 4px;">Subject_Line</p>
                <p style="font-size: 16px; font-weight: 500; margin: 0; color: #ffffff;">${subject}</p>
              </div>
            </div>

            <div style="margin-bottom: 32px;">
              <p style="font-family: monospace; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; font-size: 9px; margin-bottom: 12px;">Message_Payload</p>
              <div style="font-size: 15px; line-height: 1.6; color: #cbd5e1; white-space: pre-wrap; background: rgba(0,0,0,0.2); padding: 24px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.03);">
                ${message}
              </div>
            </div>

            <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); pt-24; text-align: center;">
              <p style="font-family: monospace; color: #475569; font-size: 9px; text-transform: uppercase; letter-spacing: 0.4em; margin-top: 24px;">Nagpur, IN — Listening_on_Port:2026</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }

    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      },
      body: JSON.stringify({ message: "Email sent successfully", data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
