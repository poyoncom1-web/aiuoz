"use client";
import React, { useEffect, useState } from "react";

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // ⏳ اسپلش 3 ثانیه

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        fixed inset-0 flex items-center justify-center
        bg-yellow-400 text-white text-5xl font-extrabold tracking-wide
        transition-opacity duration-700
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      هیرمند
    </div>
  );
};

export default SplashScreen;
