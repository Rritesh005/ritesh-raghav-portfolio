import { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  openResume: () => void;
}

export default function Header({ currentTab, onTabChange, openResume }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', id: 'about', type: 'section' },
    { label: 'Projects', id: 'projects', type: 'section' },
    { label: 'Guestbook', id: 'guestbook', type: 'view' },
    { label: 'Contact', id: 'contact', type: 'section' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setMobileMenuOpen(false);
    if (item.type === 'view') {
      onTabChange(item.id);
    } else {
      onTabChange('portfolio');
      // Delay slightly to give time for view switch if we were on guestbook
      setTimeout(() => {
        const element = document.getElementById(item.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#101415]/90 backdrop-blur-md border-b border-[#424754]/50 py-3 shadow-lg'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <nav className="flex justify-between items-center max-w-[1200px] mx-auto px-6 md:px-12 w-full">
          {/* Logo */}
          <button
            id="nav-logo"
            onClick={() => {
              onTabChange('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-lg md:text-xl font-extrabold text-[#adc6ff] hover:text-[#4d8eff] tracking-tight transition-colors cursor-pointer"
          >
            Ritesh Raghav
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-1">
              {navItems.map((item) => {
                const isActive =
                  item.id === 'guestbook'
                    ? currentTab === 'guestbook'
                    : currentTab === 'portfolio';

                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item)}
                    className={`relative px-4 py-2 font-sans text-sm font-medium tracking-wide transition-all rounded-lg cursor-pointer ${
                      isActive &&
                      ((item.id === 'guestbook' && currentTab === 'guestbook') ||
                        (item.id !== 'guestbook' && currentTab === 'portfolio'))
                        ? 'text-[#adc6ff]'
                        : 'text-[#c2c6d6] hover:text-[#adc6ff]'
                    }`}
                  >
                    {item.label}
                    {isActive &&
                      ((item.id === 'guestbook' && currentTab === 'guestbook') ||
                        (item.id !== 'guestbook' && currentTab === 'portfolio' && item.id === 'about')) && (
                        <motion.div
                          layoutId="activeTabUnderline"
                          className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#adc6ff]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                  </button>
                );
              })}
            </div>

            <button
              id="desktop-resume-btn"
              onClick={openResume}
              className="flex items-center gap-2 bg-[#adc6ff] hover:bg-[#8292aa] text-[#001a42] font-bold px-5 py-2 rounded-lg text-sm transition-all focus:ring-2 focus:ring-[#adc6ff]/50 cursor-pointer active:scale-95"
            >
              <FileText size={16} />
              Resume
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden text-[#e0e3e5] hover:text-[#adc6ff] transition-colors p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[60px] z-40 bg-[#101415]/98 backdrop-blur-lg border-b border-[#424754] flex flex-col p-6 space-y-6 md:hidden h-fit"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item)}
                  className="w-full text-left font-display text-xl font-bold py-3 px-4 rounded-xl text-[#e0e3e5] hover:bg-[#3f465c]/30 hover:text-[#adc6ff] transition-all cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#424754]/50">
              <button
                id="mobile-resume-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openResume();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#adc6ff] hover:bg-[#8292aa] text-[#001a42] font-bold py-4 rounded-xl text-md transition-all active:scale-95"
              >
                <FileText size={18} />
                View & Download Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
