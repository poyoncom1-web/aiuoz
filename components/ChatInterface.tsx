"use client";

import React, { useState } from "react";
import HeadSection from "@/components/HeadSection";
import MessageList from "@/components/MessageList";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import SplashScreen from "@/components/SplashScreen";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
  id: string;
  timestamp: number;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      id: `user-${Date.now()}`,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "خطا در ارتباط با سرور");
      }

      const botReply: Message = {
        role: "assistant",
        content: data.reply,
        id: `assistant-${Date.now()}`,
        timestamp: Date.now(),
      };

      // تأخیر کوتاه برای حس طبیعی‌تر
      setTimeout(() => {
        setMessages((prev) => [...prev, botReply]);
      }, 300);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "خطای ناشناخته");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* اسپلش اسکرین ۳ ثانیه‌ای */}
      <SplashScreen />

      <section className="min-h-screen w-full bg-gradient-to-br from-[#fff9e6] via-[#fcefc7] to-[#f5e6d3] flex flex-col relative overflow-hidden">
        {/* افکت دکوراتیو پس‌زمینه */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#e6c15a]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#8a4b22]/10 rounded-full blur-3xl" />
        </div>

        {/* هدر ثابت */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-50 border-b border-[#c9a24d]/30 bg-white/80 backdrop-blur-xl shadow-sm"
        >
          <HeadSection />
        </motion.div>

        {/* محتوای اصلی - پیام‌ها */}
        <div className="flex-1 overflow-y-auto relative z-10">
          <MessageList messages={messages} isLoading={isLoading} />
        </div>

        {/* نوار ورودی ثابت */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="sticky bottom-0 z-50 border-t border-[#c9a24d]/30 bg-white/90 backdrop-blur-xl shadow-lg"
        >
          <form onSubmit={handleSubmit} className="px-4 py-4 sm:py-5">
            <div className="flex items-end gap-2 sm:gap-3 max-w-5xl mx-auto">
              {/* اینپوت چندخطی مدرن */}
              <div className="flex-1 relative">
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <textarea
                    className="
                      w-full px-4 sm:px-5 py-3 sm:py-3.5
                      rounded-2xl
                      bg-white
                      border-2 border-[#e6c15a]/50
                      text-[#3b1f0f]
                      placeholder-[#8b6a3f]/60
                      focus:outline-none focus:border-[#c9a24d]
                      focus:ring-2 focus:ring-[#e6c15a]/30
                      transition-all duration-300
                      resize-none
                      min-h-[48px]
                      max-h-[120px]
                      shadow-sm
                    "
                    value={input}
                    placeholder="پیام خود را بنویسید..."
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    rows={1}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height =
                        Math.min(target.scrollHeight, 120) + "px";
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                </motion.div>

                {/* دکمه پاک کردن متن */}
                <AnimatePresence>
                  {input && (
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      type="button"
                      onClick={() => setInput("")}
                      className="absolute left-3 top-3 text-[#8b6a3f]/70 hover:text-[#8b6a3f] transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* دکمه ارسال */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!input.trim() || isLoading}
                className="
                  bg-gradient-to-r from-[#e6c15a] via-[#d4a849] to-[#8a4b22]
                  text-white
                  px-5 sm:px-6 py-3 sm:py-3.5
                  rounded-2xl
                  shadow-lg hover:shadow-xl
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-300
                  flex items-center justify-center
                  min-w-[48px]
                "
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                )}
              </motion.button>
            </div>

            {/* راهنمای کوتاه */}
           
          </form>

          <Footer />
        </motion.div>
      </section>
    </>
  );
};

export default ChatInterface;
