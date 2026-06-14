import { X, Mail, Phone, MapPin, Printer, Download, Award, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="resume-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        id="resume-modal-container"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#1d2022] border border-[#424754] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header toolbar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#424754]/50 bg-[#191c1e]">
          <h3 className="font-display font-bold text-lg text-[#adc6ff] flex items-center gap-2">
            <Award size={18} /> Interactive CV Preview
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="p-2 text-[#c2c6d6] hover:text-[#adc6ff] hover:bg-[#3f465c]/30 rounded-lg transition-all cursor-pointer"
              title="Print / Save as PDF"
            >
              <Printer size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#c2c6d6] hover:text-rose-400 hover:bg-[#3f465c]/30 rounded-lg transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 text-[#e0e3e5] space-y-8 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-[#424754]/30 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="font-display text-3xl font-extrabold text-[#e0e3e5]">Ritesh Raghav</h2>
              <p className="font-mono text-[#adc6ff] font-medium tracking-wide">FRONT-END / INTERACTIVE UI DEVELOPER</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#c2c6d6]">
              <span className="flex items-center gap-2">
                <Mail size={14} className="text-[#adc6ff]" /> info@ritesh.dev
              </span>
              <span className="flex items-center gap-2">
                <Phone size={14} className="text-[#adc6ff]" /> +91 7638 035 269
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-[#adc6ff]" /> New Delhi, India
              </span>
              <span className="flex items-center gap-2">
                <Award size={14} className="text-[#adc6ff]" /> Available for Internships
              </span>
            </div>
          </div>

          {/* Profile Overview */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-lg text-[#adc6ff] border-b border-[#424754]/10 pb-1">Professional Overview</h4>
            <p className="text-[#c2c6d6] leading-relaxed">
              Highly motivated computer science student with a core specialty in front-end software design, high-fidelity responsive systems, and micro-interactions. Detail-oriented coder who bridges the gap between meticulous, functional logic and striking visual presentation. Experienced build coordinator for robust dashboard systems, data visualizers, and responsive web applications.
            </p>
          </div>

          {/* Experience Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Experience */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-lg text-[#adc6ff] border-b border-[#424754]/10 pb-1 flex items-center gap-2">
                <Briefcase size={16} /> Technical Work
              </h4>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <h5 className="font-bold text-[#e0e3e5]">Self-Employed / Freelance Developer</h5>
                    <span className="text-xs font-mono text-[#adc6ff]">2023 - Present</span>
                  </div>
                  <p className="text-xs text-[#c2c6d6]">New Delhi, India</p>
                  <ul className="list-disc list-inside text-sm text-[#c2c6d6] space-y-1 mt-2">
                    <li>Built 10+ custom responsive portfolios and landing screens for high-performance websites.</li>
                    <li>Integrated real-time database interfaces, Google Maps APIs, and localized state persistence models.</li>
                    <li>Optimized desktop/mobile load times by refactoring heavy CSS styles into performant utility systems.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education & Certs */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-lg text-[#adc6ff] border-b border-[#424754]/10 pb-1 flex items-center gap-2">
                <GraduationCap size={16} /> Education
              </h4>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <h5 className="font-bold text-[#e0e3e5]">B.Tech in Computer Science & Engineering</h5>
                    <span className="text-xs font-mono text-[#adc6ff]">2022 - 2026</span>
                  </div>
                  <p className="text-xs text-[#c2c6d6]">Active undergraduate student</p>
                  <p className="text-sm text-[#c2c6d6] mt-2">
                    Focus: Advanced Web Architectures, Software Design Principles, Algorithms, and UI Engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-lg text-[#adc6ff] border-b border-[#424754]/10 pb-1">Technical Skills Spectrum</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'Express', 'HTML5 & CSS3', 'JavaScript (ES6+)', 'Chart.js & Recharts', 'Framer Motion', 'Git & GitHub Workflow', 'Responsive Design', 'Bento Architecture'].map((skill) => (
                <span key={skill} className="bg-[#1d2022] border border-[#424754] text-[#c2c6d6] text-xs font-semibold px-3 py-1 rounded-md">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions bar */}
        <div className="px-6 py-4 border-t border-[#424754]/50 bg-[#191c1e] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#424754] text-[#c2c6d6] hover:text-[#adc6ff] hover:border-[#adc6ff] rounded-lg text-sm font-medium transition-all cursor-pointer"
          >
            Close Preview
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#adc6ff] hover:bg-[#8292aa] text-[#001a42] font-bold px-5 py-2 rounded-lg text-sm transition-all cursor-pointer active:scale-95"
          >
            <Printer size={16} /> Print or Save as PDF
          </button>
        </div>
      </motion.div>
    </div>
  );
}
