import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
  timestamp: number;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const TypingAnimation = () => {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className="w-2 h-2 bg-[#c9a24d] rounded-full"
        />
      ))}
    </div>
  );
};

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <div className="whitespace-pre-wrap">
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-[#c9a24d] ml-1"
        />
      )}
    </div>
  );
};

const MessageBubble = ({
  message,
  index,
}: {
  message: Message;
  index: number;
}) => {
  const isUser = message.role === "user";

  // ✅ پیام‌های کاربر: همون بابل قبلی
  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        className="w-full flex justify-start"
      >
        <div
          className={`
            max-w-[85%] sm:max-w-[75%]
            relative
            order-1
          `}
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="
              px-4 sm:px-5 py-3 sm:py-3.5
              text-sm sm:text-base
              leading-relaxed
              bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900
              text-white
              rounded-3xl rounded-tr-md
              shadow-lg
              border border-gray-600/30
            "
          >
            <div className="whitespace-pre-wrap">{message.content}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="
              text-xs text-[#8b6a3f]/60 mt-1 px-2
              text-left
            "
          >
            {new Date(message.timestamp).toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // ✅ پیام‌های دستیار: سمت مقابل سؤال، بدون بابل، روی بک‌گراند با متن مشکی
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="w-full flex justify-end"
    >
      <div className="max-w-[85%] sm:max-w-[75%]">
        <div
          className="
            text-sm sm:text-base
            leading-relaxed
            text-black
            whitespace-pre-wrap
            text-right
          "
        >
          <TypewriterText text={message.content} />
        </div>

        <div
          className="
            text-xs text-[#8b6a3f]/60 mt-1 px-1
            text-right
          "
        >
          {new Date(message.timestamp).toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </motion.div>
  );
};

const WelcomeScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center h-full text-center px-4 py-12"
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        className="text-6xl sm:text-7xl mb-6"
      >
        👋
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-3xl text-[#3b1f0f] mb-3"
      >
        سلام! من هیرمند هستم
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[#8b6a3f] max-w-md mb-2"
      >
        دستیار هوشمند دانشگاه زابل
      </motion.p>
    </motion.div>
  );
};

const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto px-3 sm:px-6 py-6 custom-scrollbar"
    >
      {messages.length === 0 ? (
        <WelcomeScreen />
      ) : (
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <MessageBubble key={message.id} message={message} index={index} />
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex justify-end"
            >
              <div className="max-w-[85%] sm:max-w-[75%]">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl rounded-tl-md shadow-md border border-[#e6c15a]/20">
                  <TypingAnimation />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(201, 162, 77, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(201, 162, 77, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 162, 77, 0.5);
        }
      `}</style>
    </div>
  );
};

export default MessageList;
