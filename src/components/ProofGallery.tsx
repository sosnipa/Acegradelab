"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Proof = {
  _id: string;
  url: string;
  caption: string;
  type: "image" | "video";
};

export default function ProofGallery() {
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const LIMIT = 6;

  const loadProofs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/proof/list?skip=${skip}&limit=${LIMIT}`);
      const data = await res.json();
      setProofs((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const newProofs = data.filter((p: Proof) => !existingIds.has(p._id));
        return [...prev, ...newProofs];
      });
      setSkip((prev) => prev + LIMIT);
    } catch (err) {
      console.error("Failed to load proofs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProofs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ✅ This is fine because loadProofs is stable (not inline)

  return (
    <section className="bg-white py-20 px-6 sm:px-12 text-center">
      <h2 className="text-3xl font-bold text-[#0E0E10] mb-12">Proof of Work</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {proofs.map((item) => (
          <div
            key={item._id}
            className="rounded-xl overflow-hidden shadow hover:shadow-xl transition"
          >
            <div className="relative w-full h-60">
              {item.type === "image" ? (
                <Image
                  src={item.url}
                  alt={item.caption}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                  priority
                />
              ) : (
                <video
                  controls
                  className="w-full h-full object-cover rounded-t-xl"
                >
                  <source src={item.url} type="video/mp4" />
                </video>
              )}
            </div>
            <p className="bg-[#6C4FF7] text-white py-2 text-sm font-medium">
              {item.caption}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={loadProofs}
        disabled={loading}
        className="mt-10 bg-[#6C4FF7] text-white px-6 py-2 rounded hover:opacity-90"
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </section>
  );
}
