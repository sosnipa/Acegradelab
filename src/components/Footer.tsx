import { FaInstagram, FaTiktok, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0E0E10] text-white py-12 px-6 sm:px-12 text-center">
      <h3 className="text-xl font-semibold mb-4">Stay Plugged In</h3>
      <div className="flex justify-center gap-6 text-2xl mb-6">
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram className="hover:text-[#6C4FF7] transition" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noreferrer">
          <FaTiktok className="hover:text-[#6C4FF7] transition" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter className="hover:text-[#6C4FF7] transition" />
        </a>
        <a href="mailto:acegradelab@gmail.com" target="_blank" rel="noreferrer">
          <FaEnvelope className="hover:text-[#6C4FF7] transition" />
        </a>
      </div>
      <div className="text-sm text-white/70">
        <p>
          &copy; {new Date().getFullYear()} AceGradeLab. All rights reserved.
        </p>
        <p>Terms & Privacy will be added soon.</p>
      </div>
    </footer>
  );
}
