import { useState, useEffect, useRef } from 'react';
import './Menu.css';

const DISHES = [
  {
    id: 1,
    name: 'Rigatoni sauce tomate, burrata & parmesan',
    category: 'pates',
    tag: 'Signature',
    tagColor: '#8B1A1A',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&auto=format&fit=crop',
    description: 'Rigatoni al dente nappés d\'une sauce tomate maison mijotée, couronnés d\'une burrata fondante et de parmesan affiné.',
    price: null,
  },
  {
    id: 2,
    name: 'Escalope milanaise, rigatoni & citron',
    category: 'viandes',
    tag: 'Coup de cœur',
    tagColor: '#C9A84C',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&auto=format&fit=crop',
    description: 'Escalope panée dorée, servie avec des rigatoni et un filet de citron frais pour réveiller les papilles.',
    price: null,
  },
  {
    id: 3,
    name: 'Penne crémeuses à la viande',
    category: 'pates',
    tag: null,
    tagColor: null,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&auto=format&fit=crop',
    description: 'Penne enrobées d\'une sauce crémeuse à base de viande mijotée, un classique réconfortant de la cucina italiana.',
    price: null,
  },
  {
    id: 4,
    name: 'Cocktail Passion Fruit Martini',
    category: 'cocktails',
    tag: 'Nouveauté',
    tagColor: '#6B5B4E',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop',
    description: 'Un martini élaboré à la passion, frais et élégant pour accompagner ou clôturer votre repas.',
    price: null,
  },
  {
    id: 5,
    name: 'Sélection de vins rouges',
    category: 'vins',
    tag: 'Cave',
    tagColor: '#8B1A1A',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop',
    description: 'Une sélection de vins rouges italiens et européens, choisis pour sublimer chaque plat de notre carte.',
    price: null,
  },
];

const CATEGORIES = [
  { id: 'tous', label: 'Tous' },
  { id: 'pates', label: 'Pâtes' },
  { id: 'viandes', label: 'Viandes' },
  { id: 'cocktails', label: 'Cocktails' },
  { id: 'vins', label: 'Vins' },
];

export default function Menu({ onOpenChat }) {
  const [active, setActive] = useState('tous');
  const [visible, setVisible] = useState(new Set());
  const cardRefs = useRef([]);

  const filtered = active === 'tous' ? DISHES : DISHES.filter(d => d.category === active);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisible(v => new Set([...v, e.target.dataset.id]));
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [filtered]);

  const handleAsk = (dish) => {
    onOpenChat(`Pouvez-vous me donner plus d'informations sur le plat "${dish.name}" ?`);
  };

  return (
    <section className="menu" id="menu">
      <div className="menu__inner">
        <div className="menu__header reveal">
          <span className="menu__eyebrow">Notre Carte</span>
          <h2 className="menu__title">Une cuisine d'exception</h2>
          <p className="menu__desc">
            Des recettes authentiques élaborées avec des produits frais sélectionnés avec soin,
            fidèles à la tradition de la cucina italiana.
          </p>
        </div>

        {/* Filters */}
        <div className="menu__filters reveal">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`menu__filter${active === cat.id ? ' menu__filter--active' : ''}`}
              onClick={() => { setActive(cat.id); setVisible(new Set()); }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="menu__grid">
          {filtered.map((dish, i) => (
            <div
              key={dish.id}
              ref={el => (cardRefs.current[i] = el)}
              data-id={dish.id}
              className={`menu__card${visible.has(String(dish.id)) ? ' menu__card--visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="menu__card-img-wrap">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="menu__card-img"
                  loading="lazy"
                />
                {dish.tag && (
                  <span
                    className="menu__card-tag"
                    style={{ background: dish.tagColor }}
                  >
                    {dish.tag}
                  </span>
                )}
              </div>
              <div className="menu__card-body">
                <h3 className="menu__card-name">{dish.name}</h3>
                <p className="menu__card-desc">{dish.description}</p>
                <button
                  className="menu__card-btn"
                  onClick={() => handleAsk(dish)}
                >
                  ✨ En savoir plus sur ce plat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
