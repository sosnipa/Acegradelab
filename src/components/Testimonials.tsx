import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Testimonials() {
  const feedback = [
    { quote: "They saved my GPA. Got an A in 24hrs.", name: "Jasmine, TX" },
    { quote: "Handled my online exam flawlessly. 92%.", name: "Daniel, UK" },
    { quote: "Certified me on time. Zero stress.", name: "Fola, Australia" },
  ];

  return (
    <section className="bg-[#F9F9F9] py-20 px-6 sm:px-12 text-center">
      <motion.h2
        className="text-3xl font-bold text-[#0E0E10] mb-12"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        What Students Say
      </motion.h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {feedback.map((item, i) => (
          <motion.div
            key={i}
            className="bg-white shadow-lg p-6 rounded-xl border-t-4 border-[#6C4FF7]"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <p className="italic text-[#444] mb-4">
              &ldquo;{item.quote}&rdquo;
            </p>
            <p className="font-semibold text-[#6C4FF7]">{item.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
//LET STUDENTS BE ABLE TO AUTOMATICALLY UPLOAD THEIR PROOF OF WORK
// AND SEE TESTIMONIALS FROM OTHER STUDENTS
