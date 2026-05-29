import { useState, useEffect } from 'react';
import Logo from './Logo';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <button className="navbar__brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo size={44} light={!scrolled} />
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">La Scala</span>
            <span className="navbar__brand-sub">Cucina Autentica</span>
          </div>
        </button>

        <ul className="navbar__links">
          {[['menu', 'Menu'], ['avis', 'Avis'], ['horaires', 'Horaires'], ['contact', 'Contact']].map(([id, label]) => (
            <li key={id}>
              <button className="navbar__link" onClick={() => scrollTo(id)}>
                {label}
                <span className="navbar__link-underline" />
              </button>
            </li>
          ))}
        </ul>

        <a href="tel:0486097264" className="navbar__cta">
          Réserver
        </a>
      </div>
    </nav>
  );
}
