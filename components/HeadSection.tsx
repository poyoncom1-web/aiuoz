import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeadSectionProps {
  onClearChat?: () => void;
}

const HeadSection = ({ onClearChat }: HeadSectionProps) => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* بک‌گراند اصلی */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/1212.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* لایه تیره */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 backdrop-blur-[2px]" />

      {/* محتوای هدر */}
      <div className="relative z-10 px-4 sm:px-6 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* سمت راست - آواتار و متن */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-x-3 sm:gap-x-4"
          >
            {/* آواتار */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#ffd778] to-[#e6c15a] rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-[#ffd778]/50 shadow-lg overflow-hidden">
                <Image
                  src="/111.png"
                  alt="هیرمند - دستیار هوش مصنوعی"
                  width={64}
                  height={64}
                  className="object-contain p-1"
                />
              </div>

              {/* نقطه آنلاین */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg"
              />
            </motion.div>

            {/* متن */}
            <div>
              <motion.h1 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl sm:text-2xl font-bold text-[#ffd778] drop-shadow-lg"
              >
                هیرمند
              </motion.h1>
              <motion.p 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs sm:text-sm text-[#f5e6b3]/90 mt-0.5"
              >
                دستیار هوشمند
              </motion.p>
            </div>
          </motion.div>

          {/* سمت چپ - فقط Badge */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-x-2 sm:gap-x-3"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-x-2 bg-black/40 px-3 sm:px-4 py-2 rounded-full backdrop-blur-md border border-[#ffd778]/30 shadow-lg"
            >
              <motion.div 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-[#ffd778] rounded-full shadow-glow"
              />
              <span className="text-xs sm:text-sm text-[#ffd778] font-semibold">
                UOZ
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 10px rgba(255, 215, 120, 0.6);
        }
      `}</style>
    </div>
  );
};

export default HeadSection;
