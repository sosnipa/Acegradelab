"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#6C4FF7] py-24 px-6 sm:px-12 text-center">
      {/* Bubble Animation */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: showBubble ? 1 : 0 }}
        transition={{ duration: 3.5, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-full h-full bg-white origin-bottom z-0 rounded-t-[100%]"
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-black">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Stay Updated. Win More.
        </h2>
        <p className="text-lg mb-8 text-[#333]">
          Get discounts, priority access, and new service drops. No spam, just
          real perks.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3 rounded-lg text-black w-full sm:w-80 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-[#6C4FF7] px-6 py-3 rounded-lg font-semibold hover:bg-[#f0edff] transition"
          >
            Join the Lab
          </button>
        </form>
      </div>
    </section>
  );
}
