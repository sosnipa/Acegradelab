"use client";
import { Upload, DollarSign, Clock } from "lucide-react"; // Lucide icons

export default function HowItWorks() {
  const steps = [
    {
      title: "Submit Your Task",
      desc: "Upload assignment details, exams, or certification requirements. We review it instantly.",
      icon: <Upload className="w-8 h-8 text-[#6C4FF7]" />,
    },
    {
      title: "Get Quote & Pay",
      desc: "You get a custom price. Approve it, pay securely, and we assign a pro to your case.",
      icon: <DollarSign className="w-8 h-8 text-[#6C4FF7]" />,
    },
    {
      title: "Delivered On Time",
      desc: "Your work gets done. You receive the result in your dashboard or inbox — clean and fast.",
      icon: <Clock className="w-8 h-8 text-[#6C4FF7]" />,
    },
  ];

  return (
    <section className="bg-[#F9F9F9] py-20 px-6 sm:px-12 text-center">
      <h2 className="text-3xl font-bold text-[#0E0E10] mb-12">How It Works</h2>
      <div className="grid gap-10 sm:grid-cols-3 max-w-6xl mx-auto text-left">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 border-t-4 border-[#6C4FF7] hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#6C4FF7]">
              {step.title}
            </h3>
            <p className="text-[#333] text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
