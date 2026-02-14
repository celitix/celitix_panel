import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import InstagramLoaderAnimation from "@/assets/animation/InstagramLoaderAnimation";

const Loader = ({ text }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 5 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/10 backdrop-blur-md">
      <div className="flex flex-col items-center">
        <Lottie
          animationData={InstagramLoaderAnimation}
          loop
          className="w-56 h-56"
        />

        <p className="mt-4 text-2xl font-semibold tracking-wide bg-[length:200%_200%] bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent animate-instagram">
          {text}
          {dots}
        </p>
      </div>
    </div>
  );
};

export default Loader;
