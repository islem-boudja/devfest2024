import Image from "next/image";
import React from "react";
import { BsChatDots } from "react-icons/bs"; // Icon for the chat button
type ChatButtonProps = {
  onClick: () => void;
};

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-4 right-4 rounded-full bg-blue-600 p-3 text-white shadow-lg transition hover:bg-blue-500"
  >
    <Image src={"/chatlogo.svg"} alt="chat" height={40} width={40} />
  </button>
);

export default ChatButton;
