import { useState, useEffect, useRef } from 'react';
import './Reviews.css';

const REVIEWS = [
  {
    name: 'Angélique Vandermeir',
    initials: 'AV',
    color: '#8B1A1A',
    stars: 5,
    text: 'Cuisine excellente et copieuse pour un prix plus que raisonnable. Les 3 personnes sont très agréables. Je recommande ce resto à 200%.',
    ratings: { Cuisine: 5, Service: 5, Ambiance: 5 },
  },
  {
    name: 'Bruno Gysels',
    initials: 'BG',
    color: '#C9A84C',
    stars: 5,
    text: 'Accueil chaleureux. Très bon dans l\'assiette et dans les verres. Cadre agréable. Parking facile.',
    ratings: { Cuisine: 5, Service: 5, Ambiance: 5 },
  },
  {
    name: 'Christian Jacques',
    initials: 'CJ',
    color: '#6B5B4E',
    stars: 4,
    text: 'Cuisine excellente et patron super sympa.',
    ratings: { Cuisine: 5, Service: 5, Ambiance: 4 },
  },
];

function Stars({ count, animated }) {
  return (
    <span className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`star${i < count ? ' star--on' : ''}`}
          style={animated ? { animationDelay: `${i * 0.08}s` } : {}}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function AnimatedCounter({ target, active }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.round(start * 10) / 10);
    }, 30);
    return () => clearInterval(timer);
  }, [active, target]);

  return <span className="reviews__counter">{value.toFixed(1)}</span>;
}

function ProgressBar({ label, value, active }) {
  return (
    <div className="reviews__bar-wrap">
      <span className="reviews__bar-label">{label}</span>
      <div className="reviews__bar-track">
        <div
          className="reviews__bar-fill"
          style={{ width: active ? `${(value / 5) * 100}%` : '0%' }}
        />
      </div>
      <span className="reviews__bar-value">{value}/5</span>
    </div>
  );
}

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [statsActive, setStatsActive] = useState(false);
  const [starsActive, setStarsActive] = useState(false);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex(i => (i + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (i) => {
    clearInterval(intervalRef.current);
    setIndex(i);
    intervalRef.current = setInterval(() => {
      setIndex(j => (j + 1) % REVIEWS.length);
    }, 5000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStatsActive(true);
          setStarsActive(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const current = REVIEWS[index];

  return (
    <section className="reviews" id="avis" ref={sectionRef}>
      <div className="reviews__inner">
        <div className="reviews__header reveal">
          <span className="reviews__eyebrow">Ce que disent nos clients</span>
          <h2 className="reviews__title">La qualité se ressent</h2>
        </div>

        <div className="reviews__body">
          {/* Stats column */}
          <div className="reviews__stats reveal">
            <div className="reviews__score">
              <AnimatedCounter target={5.0} active={statsActive} />
              <div>
                <Stars count={5} animated={starsActive} />
                <p className="reviews__score-sub">17 avis Google</p>
              </div>
            </div>
            <div className="reviews__bars">
              <ProgressBar label="Cuisine" value={5} active={statsActive} />
              <ProgressBar label="Service" value={5} active={statsActive} />
              <ProgressBar label="Ambiance" value={4.7} active={statsActive} />
            </div>
            <a
              href="https://www.google.com/maps/search/La+Scala+Gembloux"
              target="_blank"
              rel="noopener noreferrer"
              className="reviews__google-btn"
            >
              ⭐ Laisser un avis Google
            </a>
          </div>

          {/* Carousel */}
          <div className="reviews__carousel reveal">
            <div className="reviews__card" key={index}>
              <div className="reviews__card-header">
                <div className="reviews__avatar" style={{ background: current.color }}>
                  {current.initials}
                </div>
                <div>
                  <p className="reviews__name">{current.name}</p>
                  <Stars count={current.stars} animated={starsActive} />
                </div>
              </div>
              <blockquote className="reviews__text">
                "{current.text}"
              </blockquote>
              <div className="reviews__mini-bars">
                {Object.entries(current.ratings).map(([k, v]) => (
                  <div key={k} className="reviews__mini-bar">
                    <span>{k}</span>
                    <div className="reviews__mini-track">
                      <div className="reviews__mini-fill" style={{ width: `${(v / 5) * 100}%` }} />
                    </div>
                    <span>{v}/5</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="reviews__dots">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  className={`reviews__dot${i === index ? ' reviews__dot--active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Avis ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
