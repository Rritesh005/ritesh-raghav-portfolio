import { X, TrendingUp, Cpu, Layout, CheckCircle, BarChart2 } from 'lucide-react';
import { motion } from 'motion/react';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CaseStudyModal({ isOpen, onClose }: CaseStudyModalProps) {
  if (!isOpen) return null;

  return (
    <div id="case-study-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <motion.div
        id="case-study-container"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-4xl bg-[#1d2022] border border-[#424754] rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Banner/Header */}
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-[#213145] to-[#101415] flex items-end p-6 md:p-10 border-b border-[#424754]/50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-[#101415]/60 hover:bg-[#101415] text-[#e0e3e5] rounded-full transition-all cursor-pointer border border-[#424754]/30"
          >
            <X size={16} />
          </button>
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#adc6ff] uppercase bg-[#adc6ff]/10 px-3 py-1 rounded-full border border-[#adc6ff]/20">
              Product Case Study
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#e0e3e5]">
              Student Skill Tracker Dashboard
            </h3>
            <p className="text-sm text-[#c2c6d6] max-w-xl">
              Analyzing the product decisions, design philosophy, and technical triumphs behind this active performance platform.
            </p>
          </div>
        </div>

        {/* Scrollable content body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 text-[#e0e3e5]">
          {/* Grid summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#191c1e] rounded-xl border border-[#424754]/30">
              <span className="text-xs text-[#c2c6d6] uppercase tracking-wider block">Role</span>
              <span className="text-sm font-bold text-[#adc6ff]">Sole Front-End Engineer</span>
            </div>
            <div className="p-4 bg-[#191c1e] rounded-xl border border-[#424754]/30">
              <span className="text-xs text-[#c2c6d6] uppercase tracking-wider block">Duration</span>
              <span className="text-sm font-bold text-[#adc6ff]">4 Weeks (Iterative)</span>
            </div>
            <div className="p-4 bg-[#191c1e] rounded-xl border border-[#424754]/30">
              <span className="text-xs text-[#c2c6d6] uppercase tracking-wider block">UX Growth</span>
              <span className="text-sm font-bold text-[#adc6ff]">+85% Engagement</span>
            </div>
            <div className="p-4 bg-[#191c1e] rounded-xl border border-[#424754]/30">
              <span className="text-xs text-[#c2c6d6] uppercase tracking-wider block">Key System</span>
              <span className="text-sm font-bold text-[#adc6ff]">Tonal Layered Bento</span>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-lg text-[#adc6ff] flex items-center gap-2">
              <Cpu size={18} /> The Core Problem
            </h4>
            <p className="text-[#c2c6d6] leading-relaxed">
              When students transition into professional software development, they encounter an immense, unorganized landscape of technologies (React, Redux, Node, TypeScript, SQL). Without tangible, immediate, visual feedback loops, study motivation naturally decays. Traditional educational structures lack customized track progress parameters, causing substantial student drops.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-lg text-[#adc6ff] flex items-center gap-2">
              <Layout size={18} /> Engineering Solution & Architecture
            </h4>
            <p className="text-[#c2c6d6] leading-relaxed">
              The dashboard was planned as an interactive "gamified hub" mapping the exact skill spectrum. Key engineering features implemented include:
            </p>
            <ul className="list-disc list-inside text-[#c2c6d6] space-y-2 pl-4">
              <li>
                <strong className="text-white">Fluid Bento Grid Layout:</strong> Responsive flex container resizing automatically based on window viewport measurements.
              </li>
              <li>
                <strong className="text-white">Active Progress Calibration:</strong> Dynamic React hooks updating bar levels instantly upon completed track modules, saving states safely inside the local storage engine.
              </li>
              <li>
                <strong className="text-white">Elegant Chart Visualization:</strong> Integrated crisp charts with custom gradient backgrounds and precise stroke parameters aligning with the visual theme guidelines.
              </li>
            </ul>
          </div>

          {/* Section 3: Impact */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-lg text-[#adc6ff] flex items-center gap-2">
              <TrendingUp size={18} /> Measurable Outcomes
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 bg-[#323537]/20 border border-[#424754]/40 rounded-xl">
                <CheckCircle className="text-emerald-400 shrink-0" />
                <div>
                  <h5 className="font-bold">40% Session Duration Increase</h5>
                  <p className="text-xs text-[#c2c6d6] mt-1">
                    Incorporation of visual micro-achievements incentivized daily login cycles and lengthened student study streaks.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-[#323537]/20 border border-[#424754]/40 rounded-xl">
                <CheckCircle className="text-emerald-400 shrink-0" />
                <div>
                  <h5 className="font-bold">85% Study Goal Achievement</h5>
                  <p className="text-xs text-[#c2c6d6] mt-1">
                    Clear visual priority cards focused student attention on critical immediate tasks, eliminating decision fatigue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-[#424754]/50 bg-[#191c1e] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#adc6ff] hover:bg-[#8292aa] text-[#001a42] font-bold px-6 py-2 rounded-lg text-sm transition-all cursor-pointer"
          >
            Acknowledge & Close Case Study
          </button>
        </div>
      </motion.div>
    </div>
  );
}
