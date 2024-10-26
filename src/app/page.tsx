"use client";
import About from "~/components/landing/About";
import Clients from "~/components/landing/Clients";
import Footer from "~/components/landing/Footer";
import Home from "~/components/landing/Home";
import Infopage from "~/components/landing/Infopage";
import Navbar from "~/components/landing/Navbar";
import ChatButton from "~/components/landing/ChatButton";
import ChatPopup from "~/components/landing/ChatPopup";
import React, { useState } from "react";

type Props = {};

function Page({}: Props) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar />
      <Home />
      <Infopage />
      <About />
      <Clients />
      <Footer />
      <ChatButton onClick={toggleChat} />
      {isChatOpen && (
        <ChatPopup
          onClose={toggleChat}
          messages={messages}
          setMessages={setMessages}
        />
      )}
    </div>
  );
}

export default Page;
