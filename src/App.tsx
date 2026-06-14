import { useState, useEffect, FormEvent } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Mail, 
  Phone, 
  Code2, 
  Grid3X3, 
  Terminal, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Send, 
  MapPin, 
  CheckCircle2, 
  Activity, 
  Flame 
} from 'lucide-react';

import Header from './components/Header';
import ResumeModal from './components/ResumeModal';
import CaseStudyModal from './components/CaseStudyModal';
import Footer from './components/Footer';
import { GuestbookMessage } from './types';

// Pre-populated high-quality initial guestbook community notes
const INITIAL_NOTES: GuestbookMessage[] = [
  {
    id: 'note-1',
    name: 'James Smith',
    message: 'Your portfolio is absolutely stunning, Ritesh! The attention to detail in the typography and layout is professional. Looking forward to seeing your future projects.',
    timestamp: '2 hours ago',
    createdAt: Date.now() - 7200000,
    avatar: 'JS',
    avatarBg: 'bg-[#3f465c] text-[#adc6ff]',
    pinned: true,
  },
  {
    id: 'note-2',
    name: 'Ananya Patel',
    message: 'Great work on the backend architecture of your recent e-commerce project. Very impressed with the load speeds and clean code.',
    timestamp: 'Yesterday',
    createdAt: Date.now() - 86400000,
    avatar: 'AP',
    avatarBg: 'bg-[#323537] text-[#bec6e0]',
  },
  {
    id: 'note-3',
    name: 'David Ross',
    message: "Hey Ritesh, I just saw your UI design on Dribbble. The \"Nexus\" system looks incredibly solid. Would love to collaborate on something soon!",
    timestamp: '3 days ago',
    createdAt: Date.now() - 259200000,
    avatar: 'DR',
    avatarBg: 'bg-[#4d8eff]/20 text-[#adc6ff]',
  }
];

// Additional mock notes loaded when user clicks "Load Older Messages"
const OLDER_NOTES: GuestbookMessage[] = [
  {
    id: 'note-4',
    name: 'Sarah Jenkins',
    message: 'The performance optimizations on your dashboard projects are stellar. Transitioning to single-variable tailwind themes makes rendering so much lighter!',
    timestamp: '5 days ago',
    createdAt: Date.now() - 432000000,
    avatar: 'SJ',
    avatarBg: 'bg-[#8292aa]/30 text-[#d3e4fe]',
  },
  {
    id: 'note-5',
    name: 'Marcus Brody',
    message: 'Excellent responsive bento grid structure. Fits perfectly on high-DPI ultrawides and stays readable down to narrow mobile viewports.',
    timestamp: '1 week ago',
    createdAt: Date.now() - 604800000,
    avatar: 'MB',
    avatarBg: 'bg-[#4f46e5]/20 text-[#818cf8]',
  },
  {
    id: 'note-6',
    name: 'Arjun Mehta',
    message: 'Clean engineering and structural modularity. Bridging Geist and Hanken Grotesk gives the workspace extreme legibility.',
    timestamp: '2 weeks ago',
    createdAt: Date.now() - 1209600000,
    avatar: 'AM',
    avatarBg: 'bg-[#059669]/20 text-[#34d399]',
  }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<'portfolio' | 'guestbook'>('portfolio');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  // States for Guestbook
  const [guestbookNotes, setGuestbookNotes] = useState<GuestbookMessage[]>([]);
  const [olderNotesLoaded, setOlderNotesLoaded] = useState(false);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [noteForm, setNoteForm] = useState({ name: '', message: '' });
  const [guestbookSuccess, setGuestbookSuccess] = useState(false);

  // States for Contact Form
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');

  // Skill progression interactive states
  const [testSkillsRun, setTestSkillsRun] = useState<Record<string, number>>({
    html5: 100,
    css: 100,
    js: 100,
    tooling: 100,
  });
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);

  // Load and save guestbook notes inside localStorage
  useEffect(() => {
    const saved = localStorage.getItem('guestbook_notes');
    if (saved) {
      try {
        setGuestbookNotes(JSON.parse(saved));
      } catch (e) {
        setGuestbookNotes(INITIAL_NOTES);
      }
    } else {
      setGuestbookNotes(INITIAL_NOTES);
    }
  }, []);

  const saveNotes = (notes: GuestbookMessage[]) => {
    setGuestbookNotes(notes);
    localStorage.setItem('guestbook_notes', JSON.stringify(notes));
  };

  // Switch between tabs handler
  const handleTabChange = (tab: string) => {
    if (tab === 'guestbook') {
      setCurrentTab('guestbook');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setCurrentTab('portfolio');
    }
  };

  // Scroll back to top
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit new guestbook message
  const handleGuestbookSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!noteForm.name.trim() || !noteForm.message.trim()) return;

    // Capitalize first, second letter for avatar initials
    const initials = noteForm.name
      .trim()
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0].toUpperCase())
      .join('');

    // Pre-allocated palette of background colors
    const backgrounds = [
      'bg-[#3f465c] text-[#adc6ff]',
      'bg-[#323537] text-[#bec6e0]',
      'bg-[#4d8eff]/20 text-[#adc6ff]',
      'bg-[#1a2b3e] text-[#b7c8e1]'
    ];
    const chosenBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    const newNote: GuestbookMessage = {
      id: `custom-${Date.now()}`,
      name: noteForm.name.trim(),
      message: noteForm.message.trim(),
      timestamp: 'Just now',
      createdAt: Date.now(),
      avatar: initials || 'R',
      avatarBg: chosenBg,
    };

    const updatedNotes = [newNote, ...guestbookNotes];
    saveNotes(updatedNotes);

    setNoteForm({ name: '', message: '' });
    setGuestbookSuccess(true);
    setTimeout(() => setGuestbookSuccess(false), 3000);
  };

  // Load older comments
  const handleLoadOlder = () => {
    setIsLoadingOlder(true);
    setTimeout(() => {
      // Append older notes
      const updatedNotes = [...guestbookNotes, ...OLDER_NOTES];
      saveNotes(updatedNotes);
      setOlderNotesLoaded(true);
      setIsLoadingOlder(false);
    }, 800);
  };

  // Handle contact form submission
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactError('');

    if (!contactForm.name.trim() || !contactForm.message.trim()) {
      setContactError('Please fill out all mandatory fields.');
      return;
    }

    // Quick regex email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (contactForm.email && !emailRegex.test(contactForm.email.trim())) {
      setContactError('Please provide a valid email format.');
      return;
    }

    // Success state feedback loop
    setContactSuccess(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => {
      setContactSuccess(false);
    }, 4500);
  };

  // Simulate engineering capability diagnostics on clicking a skill card
  const runSkillDiagnostic = (key: string) => {
    if (activeSimulation) return;
    setActiveSimulation(key);
    
    // Animate meter down to 20%, then rapidly climb back to 110% overload!
    let progress = 100;
    const interval = setInterval(() => {
      progress = Math.max(15, progress - 15);
      setTestSkillsRun((prev) => ({ ...prev, [key]: progress }));
      if (progress <= 15) {
        clearInterval(interval);
        
        // Boost upwards!
        setTimeout(() => {
          let boost = 15;
          const boostInterval = setInterval(() => {
            boost = Math.min(100, boost + 12);
            setTestSkillsRun((prev) => ({ ...prev, [key]: boost }));
            if (boost >= 100) {
              clearInterval(boostInterval);
              setActiveSimulation(null);
            }
          }, 40);
        }, 150);
      }
    }, 35);
  };

  return (
    <div className="min-h-screen bg-[#101415] text-[#e0e3e5] relative flex flex-col font-sans antialiased selection:bg-[#adc6ff] selection:text-[#002e6a]">
      {/* Absolute floating backdrop glows */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-[#4d8eff]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-10 w-[280px] h-[280px] bg-[#adc6ff]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Primary Header Component */}
      <Header 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        openResume={() => setIsResumeOpen(true)} 
      />

      <nav className="h-20" /> {/* Spacer for header fix */}

      {/* Main Tab Interface Screen */}
      <main className="flex-grow w-full">
        <AnimatePresence mode="wait">
          {currentTab === 'portfolio' ? (
            <motion.div
              key="portfolio-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-32 mb-20"
            >
              {/* HERO SECTION */}
              <section id="hero" className="max-w-[1200px] mx-auto px-6 md:px-12 pt-16 flex items-center min-h-[calc(100vh-120px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
                  <div className="space-y-8 text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3f465c]/30 border border-[#add4ce]/20 text-[#add4ce] text-xs font-mono font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      AVAILABLE FOR WORK
                    </div>
                    
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#e0e3e5] leading-[1.1]">
                      Crafting <span className="text-[#adc6ff] relative">Intuitive</span> Digital Experiences.
                    </h1>
                    
                    <p className="font-sans text-[#c2c6d6] text-lg leading-relaxed max-w-lg">
                      I'm Ritesh Raghav, a front-end developer dedicated to building high-performance, accessible, and visually stunning web interfaces with precision.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <button
                        onClick={() => {
                          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 bg-[#adc6ff] text-[#001a42] font-bold text-sm tracking-wide rounded-lg hover:bg-[#primary-fixed-dim] hover:shadow-[0_0_20px_rgba(173,198,255,0.2)] transition-all cursor-pointer active:scale-95"
                      >
                        View Projects
                      </button>
                      <button
                        onClick={() => {
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 border border-[#8c909f] text-[#e0e3e5] hover:text-[#adc6ff] hover:border-[#adc6ff] font-bold text-sm tracking-wide rounded-lg transition-all cursor-pointer"
                      >
                        Get In Touch
                      </button>
                    </div>
                  </div>

                  {/* Desktop Right workspace photo with lighting accents */}
                  <div className="hidden md:block relative h-[450px] w-full">
                    <div className="absolute inset-0 bg-[#adc6ff]/5 rounded-3xl blur-[40px]" />
                    <div className="relative z-10 w-full h-full p-1.5 bg-gradient-to-tr from-[#424754]/30 via-transparent to-[#424754]/30 rounded-3xl border border-[#424754]/40 overflow-hidden shadow-2xl group">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLZUK7dj4-9cNEYSq0svC33jjfoCXppwYJwRHWCnOGWMl0zf2QxFzuB7klpq9XJUjkpTMBLhAfEk-xNz4UUIYivQl7fSQ-jQbR1orCwdq5IILzlgj9ZAEggVPJXDcWpiXLL-aqZumvSQ_WE345PQSKDKkGUigmAy35_kfrra8o8ZUnI4mAtIYww-pwCVjv8AaHj9eQ-IcDkMqJyMYsqmBom3fJxDmGkT1U-XCxL7Q_M5HQuN7bhHLDTG4iR2oS2EW0P6Jdt6-n8Yo" 
                        alt="Workspace mockup with laptop and electric blue glows" 
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500 shadow-inner"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 bg-[#101415]/75 border border-[#424754]/40 px-3 py-1 text-xs text-[#adc6ff] font-mono rounded-md">
                        #riteshraghav
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ABOUT SECTION */}
              <section id="about" className="py-24 bg-[#191c1e] border-y border-[#424754]/20">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                  <div className="flex flex-col md:flex-row gap-16 items-start">
                    {/* Left Column Heading Stick */}
                    <div className="md:w-1/3 sticky top-28">
                      <span className="text-xs font-mono font-bold tracking-wider text-[#adc6ff] uppercase block mb-3">
                        01. PERSPECTIVE
                      </span>
                      <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#e0e3e5]">
                        About <br />
                        <span className="text-[#adc6ff]">The Developer</span>
                      </h2>
                    </div>

                    {/* Right Column Body */}
                    <div className="md:w-2/3 space-y-6">
                      <p className="text-lg text-[#c2c6d6] leading-relaxed">
                        I am a specialized front-end developer with a deep passion for the intersection of clean code and functional design. My approach is rooted in technical precision, ensuring that every pixel serves a purpose and every interaction feels effortless for the user.
                      </p>
                      
                      <p className="text-lg text-[#c2c6d6] leading-relaxed">
                        With a strong foundation in modern web technologies, I focus on building scalable systems that balance aesthetic clarity with performance. I believe that professional software should not only work perfectly but also provide an intellectual and composed user experience.
                      </p>

                      <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#424754]/30 mt-12">
                        <div className="p-4 bg-[#1d2022]/40 rounded-xl border border-[#424754]/10">
                          <h4 className="font-mono text-xs text-[#adc6ff] uppercase tracking-widest mb-1.5">Focus Area</h4>
                          <p className="font-display font-bold text-[#e0e3e5] text-md">Modern UI Systems</p>
                        </div>
                        <div className="p-4 bg-[#1d2022]/40 rounded-xl border border-[#424754]/10">
                          <h4 className="font-mono text-xs text-[#adc6ff] uppercase tracking-widest mb-1.5">Location</h4>
                          <p className="font-display font-bold text-[#e0e3e5] text-md">India</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* BENTO PROJECTS SECTION */}
              <section id="projects" className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
                <div className="mb-16 text-left">
                  <span className="text-xs font-mono font-bold tracking-wider text-[#adc6ff] uppercase block mb-3">
                    02. SELECTION
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#e0e3e5] tracking-tight">
                    Featured Projects
                  </h2>
                  <p className="text-[#c2c6d6] text-sm mt-3 font-medium">A selection of technical solutions and design explorations.</p>
                </div>

                {/* Grid container spanning 12 columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left Portfolio Card: Student Skill Tracker */}
                  <div className="lg:col-span-8 glass-card rounded-2xl overflow-hidden group flex flex-col justify-between">
                    <div>
                      {/* Image block */}
                      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-900 border-b border-[#424754]/20">
                        <img 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNG7LlutZ6zR2GyhfYSs1g-g1YQ6zxde0X7qBrE2i1iAB4wRb_g3OLZXhCvhUvB9YvMRzoyd6I0XamxvHt_3wJA7u_KLTZ69rpgQIeZf6gBeIcRrvXQdxHzjUf4YOLnWRA90BtDJpCB2h2oJGNj0pJIB66x-FZAFnJc4rQOix7CV4VpTrvik_oxsnmYit7O-dewczjPY_z4-ZmlHsxAUpQt7ri2zgLEimFWOA7A-NsR1dxkj4aBzAWPiuWHodjN_JQVaBH13TKuQM" 
                          alt="Skill Tracker visual dashboard showcasing charts and grids" 
                          className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4 bg-[#adc6ff] text-[#001a42] font-mono font-bold tracking-widest text-[10px] px-3 py-1 rounded">
                          FEATURED
                        </div>
                      </div>

                      {/* Info block */}
                      <div className="p-8 space-y-4">
                        <h3 className="font-display text-2xl font-bold text-[#e0e3e5]">
                          Student Skill Tracker Dashboard
                        </h3>
                        <p className="text-[#c2c6d6] text-sm leading-relaxed">
                          Built an interactive dashboard to help students track skills, learning progress, and goals in a structured and visual format. Enabled users to add skills and monitor progress using dynamic progress bars and charts. Added weekly goal tracking system to improve consistency and learning discipline. Focused on data visualization and user-friendly UI to increase engagement and motivation.
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {['React', 'Chart.js', 'Tailwind CSS', 'Framer Motion'].map((tag) => (
                            <span key={tag} className="skill-chip px-3 py-1 rounded text-xs font-mono font-medium text-[#c2c6d6]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-8 pt-0">
                      <button
                        onClick={() => setIsCaseStudyOpen(true)}
                        className="inline-flex items-center gap-2 text-[#adc6ff] hover:text-[#4d8eff] font-bold text-sm tracking-wide transition-all group"
                      >
                        Explore Case Study
                        <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Right Impact Metric Card */}
                  <div className="lg:col-span-4 flex flex-col justify-between p-8 rounded-2xl glass-card bg-gradient-to-b from-[#adc6ff]/5 to-transparent border-[#adc6ff]/20">
                    <div className="space-y-6">
                      <div className="w-12 h-12 rounded-xl bg-[#3f465c]/30 flex items-center justify-center text-[#adc6ff]">
                        <Activity size={24} />
                      </div>
                      <div className="space-y-3">
                        <span className="font-mono text-xs text-[#adc6ff] font-bold uppercase tracking-wider block">KEY OUTCOME</span>
                        <h4 className="font-display text-xl font-bold text-[#e0e3e5]">Impact Analysis</h4>
                        <p className="text-[#c2c6d6] text-sm leading-relaxed">
                          The Skill Tracker project resulted in a 40% increase in user session duration through gamified progress visualization.
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 space-y-4 border-t border-[#424754]/20 mt-6">
                      <div className="flex justify-between items-center text-xs font-mono text-[#c2c6d6]">
                        <span className="tracking-widest uppercase">UX Performance</span>
                        <span className="text-[#adc6ff] font-bold">+85%</span>
                      </div>
                      <div className="w-full bg-[#101415] h-2 rounded-full overflow-hidden border border-[#424754]/30">
                        <motion.div 
                          className="h-full bg-[#adc6ff]" 
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          transition={{ duration: 1.5, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* TECHNICAL EXPERTISE */}
              <section id="skills" className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
                <div className="text-center mb-16 space-y-3">
                  <span className="text-xs font-mono font-bold tracking-wider text-[#adc6ff] uppercase">
                    03. TECHNOLOGIES
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#e0e3e5] tracking-tight">
                    Technical Expertise
                  </h2>
                  <p className="text-[#c2c6d6] text-sm max-w-lg mx-auto">Specialized tools and languages I use to build the future.</p>
                </div>

                {/* 4 columns Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* HTML5 Card */}
                  <div 
                    onClick={() => runSkillDiagnostic('html5')}
                    className="glass-card p-8 rounded-2xl text-center flex flex-col items-center justify-between group relative overflow-hidden cursor-pointer"
                  >
                    <div className="absolute top-2 right-2 text-[8px] font-mono text-[#adc6ff]/40">DIAGNOSTICS</div>
                    <div className="w-14 h-14 rounded-full bg-[#1d2022] flex items-center justify-center text-[#adc6ff] mb-6 group-hover:scale-110 transition-transform">
                      <Code2 size={24} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-[#e0e3e5] text-lg">HTML5</h4>
                      <p className="font-sans text-xs text-[#c2c6d6]/60">Semantic &amp; Accessible</p>
                    </div>
                    
                    {/* Diagnostic progress indicator bar */}
                    <div className="w-full mt-6 space-y-1.5">
                      <div className="h-1 bg-[#101415] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#adc6ff] transition-all duration-300"
                          style={{ width: `${testSkillsRun.html5}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-[#adc6ff] tracking-wide block">
                        {activeSimulation === 'html5' ? 'CALIBRATING...' : `OPERATIONAL: ${testSkillsRun.html5}%`}
                      </span>
                    </div>
                  </div>

                  {/* CSS Flexbox/Grid Card */}
                  <div 
                    onClick={() => runSkillDiagnostic('css')}
                    className="glass-card p-8 rounded-2xl text-center flex flex-col items-center justify-between group relative overflow-hidden cursor-pointer"
                  >
                    <div className="absolute top-2 right-2 text-[8px] font-mono text-[#adc6ff]/40">DIAGNOSTICS</div>
                    <div className="w-14 h-14 rounded-full bg-[#1d2022] flex items-center justify-center text-[#adc6ff] mb-6 group-hover:scale-110 transition-transform">
                      <Grid3X3 size={24} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-[#e0e3e5] text-lg">CSS Grid</h4>
                      <p className="font-sans text-xs text-[#c2c6d6]/60">Fluid &amp; Responsive Layout</p>
                    </div>

                    {/* Diagnostic progress indicator bar */}
                    <div className="w-full mt-6 space-y-1.5">
                      <div className="h-1 bg-[#101415] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#adc6ff] transition-all duration-300"
                          style={{ width: `${testSkillsRun.css}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-[#adc6ff] tracking-wide block">
                        {activeSimulation === 'css' ? 'CALIBRATING...' : `OPERATIONAL: ${testSkillsRun.css}%`}
                      </span>
                    </div>
                  </div>

                  {/* JavaScript Card */}
                  <div 
                    onClick={() => runSkillDiagnostic('js')}
                    className="glass-card p-8 rounded-2xl text-center flex flex-col items-center justify-between group relative overflow-hidden cursor-pointer"
                  >
                    <div className="absolute top-2 right-2 text-[8px] font-mono text-[#adc6ff]/40">DIAGNOSTICS</div>
                    <div className="w-14 h-14 rounded-full bg-[#1d2022] flex items-center justify-center text-[#adc6ff] mb-6 group-hover:scale-110 transition-transform">
                      <Sparkles size={24} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-[#e0e3e5] text-lg">JavaScript</h4>
                      <p className="font-sans text-xs text-[#c2c6d6]/60">Dynamic Logic (ES6+)</p>
                    </div>

                    {/* Diagnostic progress indicator bar */}
                    <div className="w-full mt-6 space-y-1.5">
                      <div className="h-1 bg-[#101415] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#adc6ff] transition-all duration-300"
                          style={{ width: `${testSkillsRun.js}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-[#adc6ff] tracking-wide block">
                        {activeSimulation === 'js' ? 'CALIBRATING...' : `OPERATIONAL: ${testSkillsRun.js}%`}
                      </span>
                    </div>
                  </div>

                  {/* Tooling Card */}
                  <div 
                    onClick={() => runSkillDiagnostic('tooling')}
                    className="glass-card p-8 rounded-2xl text-center flex flex-col items-center justify-between group relative overflow-hidden cursor-pointer"
                  >
                    <div className="absolute top-2 right-2 text-[8px] font-mono text-[#adc6ff]/40">DIAGNOSTICS</div>
                    <div className="w-14 h-14 rounded-full bg-[#1d2022] flex items-center justify-center text-[#adc6ff] mb-6 group-hover:scale-110 transition-transform">
                      <Terminal size={24} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-[#e0e3e5] text-lg">Tooling</h4>
                      <p className="font-sans text-xs text-[#c2c6d6]/60">Git, NPM, Vite</p>
                    </div>

                    {/* Diagnostic progress indicator bar */}
                    <div className="w-full mt-6 space-y-1.5">
                      <div className="h-1 bg-[#101415] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#adc6ff] transition-all duration-300"
                          style={{ width: `${testSkillsRun.tooling}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-[#adc6ff] tracking-wide block">
                        {activeSimulation === 'tooling' ? 'CALIBRATING...' : `OPERATIONAL: ${testSkillsRun.tooling}%`}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* CONTACT SECTION CARD */}
              <section id="contact" className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
                <div className="glass-card rounded-3xl p-8 md:p-16 relative overflow-hidden bg-gradient-to-tr from-[#1d2022] to-[#101415]">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#4d8eff]/10 rounded-full blur-[110px] pointer-events-none" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Left Column Description */}
                    <div className="space-y-8">
                      <h2 className="font-display text-4xl font-extrabold text-[#e0e3e5] tracking-tight leading-[1.1]">
                        Let's build something <span className="text-[#adc6ff]">remarkable</span> together.
                      </h2>
                      
                      <div className="space-y-6 pt-4">
                        <a 
                          href="mailto:riteshraghav042005@gmail.com"
                          className="flex items-center gap-4 group cursor-pointer text-left w-fit"
                        >
                          <div className="w-12 h-12 rounded-full bg-[#3f465c]/30 flex items-center justify-center text-[#adc6ff] group-hover:bg-[#adc6ff] group-hover:text-[#001a42] transition-colors">
                            <Mail size={18} />
                          </div>
                          <div>
                            <p className="font-mono text-[10px] text-[#adc6ff] uppercase tracking-widest leading-none">Email Address</p>
                            <p className="text-[#e0e3e5] text-sm font-semibold mt-1">riteshraghav042005@gmail.com</p>
                          </div>
                        </a>

                        <a 
                          href="tel:7638035269"
                          className="flex items-center gap-4 group cursor-pointer text-left w-fit"
                        >
                          <div className="w-12 h-12 rounded-full bg-[#3f465c]/30 flex items-center justify-center text-[#adc6ff] group-hover:bg-[#adc6ff] group-hover:text-[#001a42] transition-colors">
                            <Phone size={18} />
                          </div>
                          <div>
                            <p className="font-mono text-[10px] text-[#adc6ff] uppercase tracking-widest leading-none">Direct Call</p>
                            <p className="text-[#e0e3e5] text-sm font-semibold mt-1">7638 035 269</p>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Right Column Form */}
                    <div className="space-y-6">
                      <AnimatePresence mode="wait">
                        {contactSuccess ? (
                          <motion.div
                            id="contact-form-success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-8 bg-[#add4ce]/10 border border-emerald-500/20 rounded-2xl flex flex-col items-center text-center space-y-4"
                          >
                            <CheckCircle2 size={48} className="text-emerald-400 animate-bounce" />
                            <h4 className="font-display font-bold text-xl text-white">Message Transmitted!</h4>
                            <p className="text-sm text-[#c2c6d6]">
                              Thank you! Your inquiries have reached my pipeline safely. I will react to your query within 24 business hours.
                            </p>
                          </motion.div>
                        ) : (
                          <motion.form 
                            key="contact-form"
                            exit={{ opacity: 0 }}
                            onSubmit={handleContactSubmit} 
                            className="space-y-6 text-left"
                          >
                            {contactError && (
                              <div id="contact-form-error" className="p-3.5 bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs rounded-lg font-mono">
                                {contactError}
                              </div>
                            )}

                            {/* Name Input */}
                            <div className="space-y-2">
                              <label htmlFor="contact-name" className="font-mono text-xs text-[#c2c6d6] tracking-wider uppercase block">
                                Full Name <span className="text-[#adc6ff]">*</span>
                              </label>
                              <input 
                                id="contact-name"
                                type="text"
                                required
                                placeholder="John Doe"
                                value={contactForm.name}
                                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                className="w-full bg-[#101415] border border-[#424754] text-[#e0e3e5] placeholder-[#c2c6d6]/30 text-sm font-sans rounded-lg px-4 py-3.5 focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] outline-none transition-all"
                              />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                              <label htmlFor="contact-email" className="font-mono text-xs text-[#c2c6d6] tracking-wider uppercase block">
                                Email Address
                              </label>
                              <input 
                                id="contact-email"
                                type="email"
                                placeholder="john@example.com"
                                value={contactForm.email}
                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                className="w-full bg-[#101415] border border-[#424754] text-[#e0e3e5] placeholder-[#c2c6d6]/30 text-sm font-sans rounded-lg px-4 py-3.5 focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] outline-none transition-all"
                              />
                            </div>

                            {/* Message Input */}
                            <div className="space-y-2">
                              <label htmlFor="contact-msg" className="font-mono text-xs text-[#c2c6d6] tracking-wider uppercase block">
                                Message <span className="text-[#adc6ff]">*</span>
                              </label>
                              <textarea 
                                id="contact-msg"
                                required
                                rows={4}
                                placeholder="How can I help you?"
                                value={contactForm.message}
                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                className="w-full bg-[#101415] border border-[#424754] text-[#e0e3e5] placeholder-[#c2c6d6]/30 text-sm font-sans rounded-lg px-4 py-3.5 focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] outline-none transition-all resize-none"
                              />
                            </div>

                            <button
                              id="contact-form-submit"
                              type="submit"
                              className="w-full py-4 bg-[#adc6ff] text-[#001a42] hover:bg-[#8292aa] transition-colors font-bold rounded-lg text-sm tracking-wide cursor-pointer flex items-center justify-center gap-2 active:scale-95 duration-200"
                            >
                              <Send size={16} /> Send Message
                            </button>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            /* STANDALONE GUESTBOOK VIEW */
            <motion.div
              key="guestbook-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 space-y-16 text-left"
            >
              {/* Header section */}
              <header className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-wider text-[#adc6ff] uppercase bg-[#adc6ff]/10 px-3 py-1 rounded border border-[#adc6ff]/20">
                  Visitor Ledger
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#e0e3e5]">
                  Guestbook
                </h1>
                <p className="font-sans text-lg text-[#c2c6d6] max-w-2xl leading-relaxed">
                  A space for friends, colleagues, and visitors to leave their mark. Share your thoughts, feedback, or just say hello.
                </p>
              </header>

              {/* Ledgers column grid layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Column Form */}
                <div className="lg:col-span-5 relative sticky top-28">
                  <div className="glass-panel p-8 rounded-2xl flex flex-col space-y-6">
                    <h2 className="font-display text-xl font-bold text-[#adc6ff] flex items-center gap-2">
                      <MessageSquare size={20} className="stroke-[2.5px]" />
                      Leave a Message
                    </h2>

                    <AnimatePresence mode="wait">
                      {guestbookSuccess ? (
                        <motion.div
                          id="guestbook-form-success"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl text-center space-y-3"
                        >
                          <CheckCircle className="text-emerald-400 mx-auto" size={32} />
                          <h4 className="font-semibold text-white">Message Posted!</h4>
                          <p className="text-xs text-[#c2c6d6]">
                            Your comment is now part of the public registry. Thank you for visiting!
                          </p>
                        </motion.div>
                      ) : (
                        <motion.form 
                          key="guestbook-form"
                          onSubmit={handleGuestbookSubmit} 
                          className="space-y-5"
                        >
                          {/* Name Input */}
                          <div className="space-y-2">
                            <label htmlFor="guestbook-name" className="font-mono text-xs text-[#c2c6d6] tracking-wider uppercase block">
                              Your Name
                            </label>
                            <input 
                              id="guestbook-name"
                              type="text"
                              required
                              placeholder="How should I call you?"
                              value={noteForm.name}
                              onChange={(e) => setNoteForm({ ...noteForm, name: e.target.value })}
                              className="w-full bg-[#101415] border border-[#424754] text-[#e0e3e5] placeholder-[#c2c6d6]/30 text-sm font-sans rounded-lg px-4 py-3.5 focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] outline-none transition-all"
                            />
                          </div>

                          {/* Message Input */}
                          <div className="space-y-2">
                            <label htmlFor="guestbook-msg" className="font-mono text-xs text-[#c2c6d6] tracking-wider uppercase block">
                              Your Message
                            </label>
                            <textarea 
                              id="guestbook-msg"
                              required
                              rows={5}
                              placeholder="Write something nice..."
                              value={noteForm.message}
                              onChange={(e) => setNoteForm({ ...noteForm, message: e.target.value })}
                              className="w-full bg-[#101415] border border-[#424754] text-[#e0e3e5] placeholder-[#c2c6d6]/30 text-sm font-sans rounded-lg px-4 py-3.5 focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] outline-none transition-all resize-none"
                            />
                          </div>

                          <button
                            id="guestbook-form-submit"
                            type="submit"
                            className="w-full py-4 bg-[#adc6ff] text-[#001a42] hover:bg-[#8292aa] font-bold text-sm tracking-wide rounded-lg cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-95 duration-200"
                          >
                            <span>Post Message</span>
                            <Send size={14} />
                          </button>
                        </motion.form>
                      )}
                    </AnimatePresence>

                    {/* Quick Connect static information */}
                    <div className="pt-8 border-t border-[#424754]/30 space-y-4 text-left">
                      <p className="font-mono text-[10px] text-[#adc6ff] uppercase tracking-wider font-bold">
                        Quick Connect
                      </p>
                      <div className="space-y-3">
                        <a 
                          href="tel:7638035269" 
                          className="flex items-center gap-3 text-sm text-[#c2c6d6] hover:text-[#adc6ff] transition-colors"
                        >
                          <Phone size={14} className="text-[#adc6ff]" />
                          <span>7638 035 269</span>
                        </a>
                        <a 
                          href="mailto:riteshraghav042005@gmail.com" 
                          className="flex items-center gap-3 text-sm text-[#c2c6d6] hover:text-[#adc6ff] transition-colors"
                        >
                          <Mail size={14} className="text-[#adc6ff]" />
                          <span>riteshraghav042005@gmail.com</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column List */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="flex justify-between items-center pb-2 border-b border-[#424754]/20">
                    <h2 className="font-display text-xl font-bold text-[#e0e3e5]">Community Notes</h2>
                    <span 
                      id="guestbook-notes-count"
                      className="font-mono text-xs text-[#adc6ff] bg-[#adc6ff]/10 border border-[#adc6ff]/20 px-3 py-1 rounded"
                    >
                      {guestbookNotes.length} Messages
                    </span>
                  </div>

                  {/* Message feed list */}
                  <div id="guestbook-feed-container" className="space-y-6">
                    <AnimatePresence mode="popLayout">
                      {guestbookNotes.map((note) => (
                        <motion.div
                          key={note.id}
                          layout
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-6 rounded-xl glass-panel hover:border-[#adc6ff]/40 flex flex-col gap-4"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs font-mono uppercase ${note.avatarBg}`}>
                                {note.avatar}
                              </div>
                              <div>
                                <h3 className="font-bold text-[#e0e3e5] text-sm">{note.name}</h3>
                                <p className="text-[10px] font-mono text-[#c2c6d6]/60 mt-0.5">{note.timestamp}</p>
                              </div>
                            </div>
                            {note.pinned && (
                              <span className="text-[10px] font-mono font-bold tracking-wider text-[#adc6ff] uppercase bg-[#adc6ff]/10 px-2.5 py-0.5 rounded border border-[#adc6ff]/20 flex items-center gap-1">
                                <Flame size={10} /> PINNED
                              </span>
                            )}
                          </div>

                          <p className="text-[#c2c6d6] text-sm leading-relaxed whitespace-pre-wrap">
                            {note.message}
                          </p>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Paginated state */}
                    {!olderNotesLoaded && (
                      <div className="pt-6 text-center">
                        <button
                          id="guestbook-load-older-btn"
                          onClick={handleLoadOlder}
                          disabled={isLoadingOlder}
                          className="font-mono text-xs text-[#adc6ff] hover:text-white px-6 py-3 border border-[#adc6ff]/20 rounded-lg hover:bg-[#adc6ff]/10 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          {isLoadingOlder ? 'DISPATCHING QUERY...' : 'LOAD OLDER MESSAGES'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Shared Footer component */}
      <Footer onBackToTop={handleBackToTop} />

      {/* Dynamic Popups/Overlays */}
      <AnimatePresence>
        {isResumeOpen && (
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        )}
        {isCaseStudyOpen && (
          <CaseStudyModal isOpen={isCaseStudyOpen} onClose={() => setIsCaseStudyOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
