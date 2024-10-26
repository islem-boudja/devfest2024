"use client";

import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import Markdown from "markdown-to-jsx";

export default function SmartPlan() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === "" || isLoading) return;

    setMessages([...messages, { user: input, bot: "..." }]);
    setIsLoading(true);
    setInput("");

    try {
      const response = await fetch(
        "https://2bc9-41-111-189-195.ngrok-free.app/goal/analyze-goal",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ goal: input }),
        },
      );

      const data = await response.json();
      console.log(response, data);
      const botResponse =
        data.recommendations ||
        "I'm sorry, I couldn't process that goal. Could you please rephrase or provide more details?";

      setMessages((prevMessages) => {
        // Replace the bot's response for the last message.
        const updatedMessages = prevMessages.map((message, index) =>
          index === prevMessages.length - 1
            ? { ...message, bot: botResponse }
            : message,
        );
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages((prevMessages) =>
        prevMessages.map((message, index) =>
          index === prevMessages.length - 1
            ? {
                ...message,
                bot: "There was an error processing your goal. Please try again.",
              }
            : message,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-y-6 p-4">
      <h1 className="mb-4 text-2xl font-bold text-[#071139]">
        Match Your set and achieve Goal
      </h1>

      <div className="w-full rounded-lg bg-white p-6 shadow-lg">
        {messages.length > 0 && (
          <div className="mb-6 max-h-80 overflow-y-auto rounded-lg bg-gray-100 p-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-4">
                <div className="mb-2 text-right">
                  <span className="inline-block rounded-lg bg-[#142F9F] p-2 text-white">
                    {msg.user}
                  </span>
                </div>
                <div className="text-left">
                  <Markdown className="inline-block rounded-lg bg-gray-300 p-2">
                    {msg.bot}
                  </Markdown>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Describe your goal or ask for guidance..."
            className="w-full rounded-md border px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#142F9F]"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="absolute right-2 rounded-full p-1 text-[#142F9F] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#142F9F]"
          >
            {isLoading ? (
              <svg
                className="h-6 w-6 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <IoSend size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
