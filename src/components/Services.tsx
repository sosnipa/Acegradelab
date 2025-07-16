import {
  GraduationCap,
  BookText,
  FilePenLine,
  Laptop2,
  Presentation,
  FileText,
} from "lucide-react";
import Image from "next/image";

export default function Services() {
  const services = [
    { icon: <FilePenLine className="w-5 h-5" />, label: "Assignments" },
    { icon: <Laptop2 className="w-5 h-5" />, label: "Online Exams" },
    {
      icon: <Presentation className="w-5 h-5" />,
      label: "Projects & Presentations",
    },
    { icon: <GraduationCap className="w-5 h-5" />, label: "Certifications" },
    { icon: <FileText className="w-5 h-5" />, label: "Essays & Research" },
    { icon: <BookText className="w-5 h-5" />, label: "Course Help" },
  ];

  const universities = [
    { name: "Harvard", logo: "/logos/harvard.png" },
    { name: "MIT", logo: "/logos/mit.png" },
    { name: "Stanford", logo: "/logos/stanford.png" },
    { name: "Oxford", logo: "/logos/oxford.png" },
  ];

  const courses = [
    "Python Programming",
    "Calculus & Algebra",
    "Organic Chemistry",
    "Business Strategy",
    "Data Structures & Algorithms",
    "Statistics",
    "Marketing",
    "Nursing & Health Sciences",
    "Graphic Design",
    "Macroeconomics",
    "Accounting",
    "Machine Learning",
    "Project Management",
    "Artificial Intelligence",
    "Environmental Science",
    "Cybersecurity",
    "Sociology",
    "Criminology",
    "Political Science",
    "Philosophy",
  ];

  return (
    <section className="bg-gradient-to-b from-[#F4F0FF] to-[#ffffff] py-20 px-6 sm:px-12 text-center">
      <h2 className="text-3xl font-bold text-[#0E0E10] mb-10">
        What We Help With
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
        {services.map((service) => (
          <div
            key={service.label}
            className="bg-white border border-[#E5E5E5] p-6 rounded-xl shadow hover:shadow-lg transition-shadow flex items-center gap-3 justify-center"
          >
            <div className="text-[#6C4FF7]">{service.icon}</div>
            <p className="text-lg font-semibold text-[#6C4FF7]">
              {service.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="text-xl font-semibold text-[#0E0E10] mb-4">
          Some Of The Courses We Handle
        </h3>
        <ul className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto text-sm text-[#444]">
          {courses.map((course, index) => (
            <li
              key={index}
              className="bg-white border border-[#DDD] rounded-full px-4 py-2"
            >
              {course}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16">
        <h3 className="text-xl font-semibold text-[#0E0E10] mb-6">
          Trusted by Students from Top Universities
        </h3>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {universities.map((uni, index) => (
            <div key={uni.name} className="flex flex-col items-center">
              <Image
                src={uni.logo}
                alt={uni.name}
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-[#555] text-sm font-medium">
                {uni.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
