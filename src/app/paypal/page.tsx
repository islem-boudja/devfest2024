import { env } from "~/env";

interface Props {
  searchParams: {
    code?: string;
  };
}

const PaypalPage = async ({ searchParams }: Props) => {
  const authorizationCode = searchParams.code;
  let message = "";

  const fetchToken = async (authorizationCode: string) => {
    try {
      const response = await fetch(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`).toString("base64")}`, // Proper Base64 encoding for server environment
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=authorization_code&code=${authorizationCode}`,
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }

      const data = await response.json();
      return `Success! Access token received: ${data.access_token}`;
    } catch (error) {
      return `Error:`;
    }
  };

  if (authorizationCode) {
    message = await fetchToken(authorizationCode);
  } else {
    message = "No authorization code found.";
  }

  return (
    <div>
      <h1>PayPal Authorization</h1>
      <p>{message}</p>
    </div>
  );
};

export default PaypalPage;
