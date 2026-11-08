import React, { useState, useEffect } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { ScrollExperienceHero } from './components/ScrollExperienceHero';
import { SystemsShowcase } from './components/SystemsShowcase';
import { InteractiveSandbox } from './components/InteractiveSandbox';
import { ProjectCalculator } from './components/ProjectCalculator';
import { ProjectsPortfolio } from './components/ProjectsPortfolio';
import { ContactSection } from './components/ContactSection';
import { TermsAndPrivacyModal } from './components/TermsAndPrivacyModal';
import { Footer } from './components/Footer';
import { Language } from './types';

export function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [scrollY, setScrollY] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Legal modal state
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update HTML lang and dir when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Subtle Interactive Audio Synthesizer (Zero-dependency Web Audio API)
  const toggleSound = () => {
    if (!soundEnabled) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        // Play subtle gentle harmonic chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(528, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);

        setAudioContext(ctx);
        setSoundEnabled(true);
      } catch (e) {
        setSoundEnabled(false);
      }
    } else {
      if (audioContext) {
        audioContext.close();
      }
      setSoundEnabled(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <div className="relative min-h-screen bg-[#02091d] text-slate-100 selection:bg-cyan-500 selection:text-gray-950 font-['Cairo']">
      
      {/* 3D WebGL Canvas Layer */}
      <ThreeCanvas scrollY={scrollY} />

      {/* Floating Navigation Header */}
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        scrollY={scrollY}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenPrivacy={() => setModalType('privacy')}
      />

      {/* Hero 3D Scrollytelling Experience */}
      <ScrollExperienceHero scrollY={scrollY} language={language} />

      {/* Main Systems & Solutions Showcase */}
      <main className="relative z-10">
        <SystemsShowcase language={language} />
        
        {/* Interactive Live Sandbox (POS + LMS + WhatsApp AI Bot) */}
        <InteractiveSandbox language={language} />

        {/* Real-World Production Portfolio */}
        <ProjectsPortfolio language={language} />

        {/* Interactive Project Cost & Timeline Estimator */}
        <ProjectCalculator language={language} />

        {/* VIP Contact & Lead Intake Section */}
        <ContactSection language={language} />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenTerms={() => setModalType('terms')}
        onOpenPrivacy={() => setModalType('privacy')}
      />

      {/* Legal & SLA Modal */}
      <TermsAndPrivacyModal
        isOpen={modalType !== null}
        type={modalType || 'terms'}
        onClose={() => setModalType(null)}
        language={language}
      />

    </div>
  );
}

export default App;
