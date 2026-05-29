import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import Hours from './components/Hours';
import QRCodeSection from './components/QRCodeSection';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import Logo from './components/Logo';
import './App.css';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const cursorRef = useRef(null);

  // Fade-out animation is 0.7s delay + 0.5s duration → remove at 1300ms
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(t);
  }, []);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollProgress(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Custom cursor (desktop)
  useEffect(() => {
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => {
      const el = e.target.closest('a, button, [role="button"], input, label');
      setCursorHover(!!el);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  // IntersectionObserver for .reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.12 }
    );
    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  const handleOpenChat = (msg) => {
    setChatMessage(msg);
  };

  const handleConsumeMessage = () => {
    setChatMessage('');
  };

  return (
    <>
      {/* Loading screen */}
      {loading && (
        <div className="loading-screen">
          <div className="loading-logo">
            <Logo size={80} />
          </div>
        </div>
      )}

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor${cursorHover ? ' cursor-hover' : ''}`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
        aria-hidden="true"
      />

      {/* Scroll progress */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Page sections */}
      <Navbar />
      <main>
        <Hero />
        <Menu onOpenChat={handleOpenChat} />
        <Reviews />
        <Hours />
        <QRCodeSection />
      </main>
      <Footer />

      {/* Floating Chatbot */}
      <Chatbot
        initialMessage={chatMessage}
        onConsumeMessage={handleConsumeMessage}
      />
    </>
  );
}
