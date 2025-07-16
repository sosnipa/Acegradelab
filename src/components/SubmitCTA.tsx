"use client";

import Link from "next/link";

export default function SubmitCTA() {
  return (
    <section className="bg-gradient-to-r from-black via-[#121212] to-black py-20 px-6 sm:px-12 text-center text-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="mb-8 text-[#CCCCCC] text-lg">
          Upload your task or project. We’ll review and respond fast. Simple,
          secure, and private.
        </p>
        <Link href="/submit">
          <button className="bg-[#6C4FF7] hover:bg-[#5b3fd1] transition text-white text-lg font-medium px-8 py-3 rounded-lg shadow-lg">
            Submit Your Task
          </button>
        </Link>
      </div>
    </section>
  );
}
