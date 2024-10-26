"use client";

import { useState } from "react";
import { IoSend } from "react-icons/io5";

const SmartAssistant = () => {
  const [filter, setFilter] = useState("User Guide");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    setMessages([...messages, { user: input, bot: "..." }]);
    setIsLoading(true);
    setInput("");

    try {
      const response = await fetch(
        "https://a734-154-121-84-178.ngrok-free.app/chatbot/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input_text: input }),
        },
      );

      const data = await response.json();
      const botResponse = data.answer || "Sorry, I couldn't understand that.";

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].bot = botResponse;
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].bot =
          "There was an error. Please try again.";
        return updatedMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-6">
      <h1>
        If you need help using this interface, choose the user guide. If you
        need to access any information about finances, choose the financial
        assistant.
      </h1>
      <div className="font-main relative flex cursor-pointer gap-x-2 whitespace-nowrap rounded-lg bg-white p-2 text-[17px] font-medium shadow-[0px_4px_14px_0px_#00000040]">
        <div
          className={`z-40 rounded-lg p-2 px-3 text-center ${
            filter === "Financial assistant" ? "text-main" : "text-white"
          }`}
          onClick={() => setFilter("User Guide")}
        >
          {"User Guide"}
        </div>
        <div
          className={`z-40 rounded-lg p-2 text-center ${
            filter === "Financial assistant" ? "text-white" : "text-main"
          }`}
          onClick={() => setFilter("Financial assistant")}
        >
          {"Financial assistant"}
        </div>
        <div
          className={`absolute left-0 top-[2px] z-30 h-[95%] ${
            filter === "User Guide" ? "w-[40%]" : "w-[57%]"
          } rounded-lg bg-[linear-gradient(90deg,#071139_4.6%,#142F9F_82.64%)] transition-transform duration-300 ${
            filter === "User Guide"
              ? "translate-x-0 transform"
              : "translate-x-[70%] transform"
          }`}
        ></div>
      </div>

      {/* Messages Display */}
      {messages.length > 0 && (
        <div className="max-h-80 w-3/4 overflow-y-auto rounded-lg bg-gray-100 p-4 shadow-lg">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <div className="mb-1 text-right">
                <span className="inline-block rounded-lg bg-blue-500 p-2 text-white">
                  {msg.user}
                </span>
              </div>
              <div className="text-left">
                <span className="inline-block rounded-lg bg-gray-300 p-2">
                  {msg.bot}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input and Send Button */}
      <div className="relative flex w-3/4 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your question..."
          className="flex-grow rounded-l-md border border-r-0 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <svg
              className="absolute right-10 top-3 h-5 w-5 animate-spin text-main"
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
            <IoSend className="absolute right-10 top-3 text-main" size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default SmartAssistant;
