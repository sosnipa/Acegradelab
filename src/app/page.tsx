"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore
import NET from "vanta/dist/vanta.net.min";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Newsletter from "@/components/Newsletter";
import SubmitCTA from "@/components/SubmitCTA";
import Testimonials from "@/components/Testimonials";
import ProofGallery from "@/components/ProofGallery";
import TestUploadAPI from "@/components/TestUploadAPI";
import Footer from "@/components/Footer";

export default function Home() {
  const vantaRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchProofs() {
      try {
        const res = await fetch("/api/proof/list");
        const data = await res.json();
        setProofs(data);
      } catch (err) {
        console.error("Failed to fetch proofs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProofs();
  }, []);

  useEffect(() => {
    if (!mounted || !vantaRef.current) return;

    const vantaEffect = NET({
      el: vantaRef.current,
      THREE,
      color: 0x6c4ff7,
      backgroundColor: 0xf9f9f9,
      points: 14,
      maxDistance: 24,
      spacing: 18,
      showDots: true,
      mouseControls: true,
      touchControls: false,
      gyroControls: false,
    });

    return () => vantaEffect?.destroy();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <section className="relative overflow-hidden py-24 px-6 sm:px-12 bg-[#f9f9f9] text-center min-h-[80vh]">
        <div ref={vantaRef} className="absolute inset-0 z-0" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <BookOpen className="w-12 h-12 text-[#6C4FF7] animate-bounce" />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl font-bold text-[#6C4FF7] text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Ace Your Grades.{" "}
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              Skip the Stress.
            </motion.span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-[#0E0E10] max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Get help with assignments, exams, certifications & projects — fast,
            secure, and private.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <button className="bg-[#6C4FF7] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#5b3fd1]">
              Get Help Now
            </button>
            <button className="border border-[#6C4FF7] text-[#6C4FF7] px-6 py-3 rounded-lg text-lg hover:bg-[#f0edff]">
              See How It Works
            </button>
          </motion.div>
        </div>
      </section>

      <Services />
      <HowItWorks />
      {mounted && <ProofGallery proofs={proofs} loading={loading} />}
      <Testimonials />
      <Newsletter />
      <TestUploadAPI />
      <SubmitCTA />
      <Footer />

      <div className="bg-[#0E0E10] text-white py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} AceGradeLab. All rights reserved.
        </p>
      </div>
    </>
  );
}
