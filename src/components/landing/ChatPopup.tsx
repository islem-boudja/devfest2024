"use client";
import React, { useState } from "react";
import { env } from "~/env";

type ChatPopupProps = {
  messages: { user: string; bot: string }[];
  setMessages: React.Dispatch<
    React.SetStateAction<{ user: string; bot: string }[]>
  >;
  onClose: () => void;
};

const ChatPopup: React.FC<ChatPopupProps> = ({
  messages,
  setMessages,
  onClose,
}) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    // Add the user's message to the chat
    setMessages([...messages, { user: input, bot: "..." }]);
    setIsLoading(true);
    setInput("");
    // console.log(env.AI_BASE_URL);
    try {
      const response = await fetch(
        "https://a734-154-121-84-178.ngrok-free.app/chatbot/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input_text: input }),
        },
      );
      console.log(response);

      const data = await response.json();
      console.log(data.answer);
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
    <div className="fixed bottom-16 right-16 z-30 w-80 rounded-xl border border-gray-300 bg-[#F3F6FB] shadow-lg transition-all">
      <div className="flex items-center justify-between rounded-xl bg-[linear-gradient(88.8deg,#071139_-6%,#142F9F_51.53%,#1FC274_96.93%)]">
        <h2 className="p-2 py-3 text-xl font-semibold text-white">Frisco</h2>
      </div>
      <div className="p-4">
        <div className="mt-4 flex h-60 w-full flex-col overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2 flex flex-col">
              <div className="m-1 w-fit self-end text-wrap rounded-lg bg-[#142F9F] p-2 text-white">
                {msg.user}
              </div>
              <div className="m-1 w-fit self-start rounded-lg bg-white p-2 text-main">
                {msg.bot}
              </div>
            </div>
          ))}

        </div>
        <div className="mt-2 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="mr-2 w-full rounded-md border px-3 py-1 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="rounded-md bg-blue-600 p-2 text-white"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
