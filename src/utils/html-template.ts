import { env } from "~/env";
export const generateEmailHTML = (firstName: string, token: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
          color: #333;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
          color: #007bff;
        }
        a {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
        a:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Hello, ${firstName}!</h2>
        <p>You have been invited to join our platform. Please click the link below to accept the invitation:</p>
        <a href="${env.NEXTAUTH_URL}/invite?invite=${token}">
          Accept Invitation
        </a>
      </div>
    </body>
  </html>
`;
