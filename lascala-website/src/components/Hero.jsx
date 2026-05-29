import './Hero.css';

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: `${4 + Math.random() * 8}px`,
  delay: `${Math.random() * 5}s`,
  duration: `${4 + Math.random() * 6}s`,
}));

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&auto=format&fit=crop',
];

const TITLE = 'La Scala'.split('');

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      {/* Background grid */}
      <div className="hero__grid">
        {HERO_IMAGES.map((src, i) => (
          <div key={i} className={`hero__cell hero__cell--${i}`}>
            <img src={src} alt="" loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="hero__overlay" />

      {/* Particles */}
      <div className="hero__particles" aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="hero__particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="hero__content">
        <h1 className="hero__title" aria-label="La Scala">
          {TITLE.map((char, i) => (
            <span
              key={i}
              className="hero__letter"
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
            >
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </h1>

        <p className="hero__subtitle">Cucina Autentica</p>

        <div className="hero__badge">
          <span className="hero__badge-stars">★★★★★</span>
          <span className="hero__badge-text">5.0 Google · 17 avis</span>
        </div>

        <div className="hero__actions">
          <a href="tel:0486097264" className="hero__btn hero__btn--primary">
            📞 Appeler pour réserver
          </a>
          <button
            className="hero__btn hero__btn--secondary"
            onClick={() => scrollTo('menu')}
          >
            Voir le menu
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="hero__scroll-indicator"
        onClick={() => scrollTo('menu')}
        aria-label="Défiler vers le bas"
      >
        <span className="hero__scroll-line" />
        <span className="hero__scroll-chevron">↓</span>
      </button>
    </section>
  );
}
