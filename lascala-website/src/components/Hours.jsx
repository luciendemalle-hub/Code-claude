import { useState, useEffect } from 'react';
import './Hours.css';

const SCHEDULE = [
  { day: 'Lundi',    dayIndex: 1, open: true,  hours: '12h00–14h00 / 18h30–21h30' },
  { day: 'Mardi',    dayIndex: 2, open: true,  hours: '12h00–14h00 / 18h30–21h30' },
  { day: 'Mercredi', dayIndex: 3, open: true,  hours: '12h00–14h00 / 18h30–21h30' },
  { day: 'Jeudi',    dayIndex: 4, open: true,  hours: '12h00–14h00 / 18h30–21h30' },
  { day: 'Vendredi', dayIndex: 5, open: true,  hours: '12h00–14h00 / 18h30–21h30' },
  { day: 'Samedi',   dayIndex: 6, open: false, hours: 'Fermé' },
  { day: 'Dimanche', dayIndex: 0, open: false, hours: 'Fermé' },
];

function isCurrentlyOpen(now) {
  const day = now.getDay(); // 0=Sun,1=Mon..5=Fri,6=Sat
  if (day === 0 || day === 6) return false;
  const h = now.getHours(), m = now.getMinutes();
  const mins = h * 60 + m;
  const lunch = (12 * 60 <= mins && mins < 14 * 60);
  const dinner = (18 * 60 + 30 <= mins && mins < 21 * 60 + 30);
  return lunch || dinner;
}

function nextOpeningInfo(now) {
  const day = now.getDay();
  const h = now.getHours(), m = now.getMinutes();
  const mins = h * 60 + m;

  // Today's sessions
  if (day !== 0 && day !== 6) {
    if (mins < 12 * 60) return { label: 'Ouvre aujourd\'hui à 12h00', mins: 12 * 60 - mins };
    if (mins < 18 * 60 + 30) return { label: 'Ouvre aujourd\'hui à 18h30', mins: 18 * 60 + 30 - mins };
  }

  // Next weekday
  let daysAhead = 0;
  for (let i = 1; i <= 7; i++) {
    const nextDay = (day + i) % 7;
    if (nextDay !== 0 && nextDay !== 6) {
      daysAhead = i;
      break;
    }
  }
  const dayName = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'][(day + daysAhead) % 7];
  const minsUntil = daysAhead * 24 * 60 - mins + 12 * 60;
  return { label: `Ouvre ${dayName} à 12h00`, mins: minsUntil };
}

function formatCountdown(totalMins) {
  if (totalMins <= 0) return '—';
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  if (h > 48) return `${Math.ceil(h / 24)} jours`;
  if (h > 0) return `${h}h${m.toString().padStart(2, '0')}min`;
  return `${m} min`;
}

export default function Hours() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const open = isCurrentlyOpen(now);
  const nextInfo = nextOpeningInfo(now);
  const todayIndex = now.getDay();

  return (
    <section className="hours" id="horaires">
      <div className="hours__inner">
        <div className="hours__header reveal">
          <span className="hours__eyebrow">Nous trouver</span>
          <h2 className="hours__title">Horaires & Contact</h2>
        </div>

        <div className="hours__body">
          {/* Left: status + schedule */}
          <div className="hours__left reveal">
            {/* Status badge */}
            <div className={`hours__status hours__status--${open ? 'open' : 'closed'}`}>
              <span className="hours__status-dot" />
              <span className="hours__status-text">
                {open ? 'Ouvert maintenant' : 'Fermé'}
              </span>
            </div>

            {/* Countdown */}
            {!open && (
              <div className="hours__countdown">
                <p className="hours__countdown-label">{nextInfo.label}</p>
                <p className="hours__countdown-time">{formatCountdown(nextInfo.mins)}</p>
              </div>
            )}

            {/* Schedule table */}
            <table className="hours__table">
              <tbody>
                {SCHEDULE.map(row => (
                  <tr
                    key={row.day}
                    className={`hours__row${row.dayIndex === todayIndex ? ' hours__row--today' : ''}`}
                  >
                    <td className="hours__day">{row.day}</td>
                    <td className={`hours__hours${!row.open ? ' hours__hours--closed' : ''}`}>
                      {row.hours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Parking */}
            <div className="hours__parking reveal">
              <span className="hours__parking-icon">🅿</span>
              <div>
                <p className="hours__parking-title">Parking gratuit</p>
                <p className="hours__parking-sub">Stationnement facile à proximité</p>
              </div>
            </div>
          </div>

          {/* Right: map + contact */}
          <div className="hours__right reveal">
            <div className="hours__map-wrap">
              <iframe
                title="La Scala sur Google Maps"
                src="https://maps.google.com/maps?q=Rue+du+Village+64,+5030+Gembloux,+Belgique&t=&z=16&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                allowFullScreen
              />
            </div>

            <div className="hours__contact">
              <a
                href="https://maps.google.com/?q=Rue+du+Village+64,5030+Gembloux"
                target="_blank"
                rel="noopener noreferrer"
                className="hours__contact-item"
              >
                <span className="hours__contact-icon">📍</span>
                <div>
                  <p className="hours__contact-main">Rue du Village 64</p>
                  <p className="hours__contact-sub">5030 Sauvenière (Gembloux)</p>
                </div>
              </a>
              <a href="tel:0486097264" className="hours__contact-item">
                <span className="hours__contact-icon">📞</span>
                <div>
                  <p className="hours__contact-main">0486 09 72 64</p>
                  <p className="hours__contact-sub">Réservations & renseignements</p>
                </div>
              </a>
              <div className="hours__contact-item hours__contact-item--static">
                <span className="hours__contact-icon">💶</span>
                <div>
                  <p className="hours__contact-main">40 – 70 € / personne</p>
                  <p className="hours__contact-sub">Signalé par 6 personnes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
