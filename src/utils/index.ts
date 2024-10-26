export const getTransactions = async (
  accessToken: string,
  startDate: string,
  endDate: string,
) => {
  const response = await fetch(
    `$https://api-m.sandbox.paypal.com/v1/reporting/transactions?start_date=${startDate}&end_date=${endDate}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  const data = await response.json();
  return data.transaction_details;
};
