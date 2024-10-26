"use client";
import { useState } from "react";
import { api } from "~/trpc/react";

const SendEmailPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendEmailMutation = api.invite.createInviteLink.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await sendEmailMutation.mutateAsync({
        email,
        role: "MANAGER",
      });

      if (response.success) {
        setMessage("Email sent successfully!");
      } else {
        setMessage(`Failed to send email: ${response.error}`);
      }
    } catch (error) {
      setMessage("An error occurred while sending the email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm rounded-md bg-white p-6 shadow-md">
      <h1 className="mb-4 text-center text-xl font-bold">Send Test Email</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-md px-4 py-2 font-semibold text-white ${
            loading
              ? "cursor-not-allowed bg-blue-400"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Sending..." : "Send Email"}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default SendEmailPage;
