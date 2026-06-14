import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  onBackToTop: () => void;
}

export default function Footer({ onBackToTop }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0f10] border-t border-[#424754]/50 py-12 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[#c2c6d6]">
        {/* Brand/Credits */}
        <div className="text-center md:text-left space-y-2">
          <span className="font-display font-extrabold text-lg text-[#adc6ff] tracking-tight">Ritesh Raghav</span>
          <p className="text-xs text-[#c2c6d6]/60 font-mono">
            &copy; {currentYear} Ritesh Raghav. Built with technical precision and modular React components.
          </p>
        </div>

        {/* Links & Top element */}
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="flex gap-6">
            <a
              id="footer-github"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c2c6d6] hover:text-[#adc6ff] transition-all flex items-center gap-1.5 text-xs font-mono group"
            >
              <Github size={14} className="group-hover:scale-110 transition-transform" />
              GitHub
            </a>
            <a
              id="footer-linkedin"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c2c6d6] hover:text-[#adc6ff] transition-all flex items-center gap-1.5 text-xs font-mono group"
            >
              <Linkedin size={14} className="group-hover:scale-110 transition-transform" />
              LinkedIn
            </a>
            <a
              id="footer-twitter"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c2c6d6] hover:text-[#adc6ff] transition-all flex items-center gap-1.5 text-xs font-mono group"
            >
              <Twitter size={14} className="group-hover:scale-110 transition-transform" />
              Twitter
            </a>
            <a
              id="footer-email"
              href="mailto:riteshraghav042005@gmail.com"
              className="text-[#c2c6d6] hover:text-[#adc6ff] transition-all flex items-center gap-1.5 text-xs font-mono group"
            >
              <Mail size={14} className="group-hover:scale-110 transition-transform" />
              Email
            </a>
          </div>

          <button
            onClick={onBackToTop}
            className="p-2 bg-[#1d2022] hover:bg-[#3f465c] text-[#adc6ff] border border-[#424754] rounded-lg transition-all cursor-pointer active:scale-95"
            title="Back to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
