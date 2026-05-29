import { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import './Chatbot.css';

const SYSTEM_PROMPT = `Tu es l'assistant virtuel du restaurant La Scala - Cucina Autentica à Gembloux. Tu réponds UNIQUEMENT aux questions concernant ce restaurant.

Tu connais :
- Le menu : Rigatoni sauce tomate burrata parmesan (plat Signature), Escalope milanaise rigatoni citron (Coup de cœur), Penne crémeuses à la viande, Cocktail Passion Fruit Martini, Sélection de vins rouges.
- Les horaires : lundi au vendredi 12h00-14h00 et 18h30-21h30, fermé le week-end (samedi et dimanche).
- L'adresse : Rue du Village 64, 5030 Sauvenière (Gembloux).
- Le téléphone : 0486 09 72 64.
- Les prix : 40-70€ par personne.
- La note Google : 5.0/5 avec 17 avis.
- Parking gratuit disponible à proximité.

Pour toute réservation ou demande spéciale, dis d'appeler le 0486 09 72 64.
Ne réponds JAMAIS à des questions hors restaurant.
Ne jamais inventer d'information.
Réponds toujours en français de manière chaleureuse et professionnelle.`;

const SUGGESTIONS = [
  'Quels sont vos plats ?',
  'Êtes-vous ouverts ce soir ?',
  'Comment réserver ?',
  'Avez-vous un parking ?',
  'Quels sont vos prix ?',
];

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

async function callClaude(messages) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY || '',
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const data = await res.json();
  return data.content?.[0]?.text ?? 'Désolé, je n\'ai pas pu répondre.';
}

export default function Chatbot({ initialMessage, onConsumeMessage }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [badge, setBadge] = useState(true);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (initialMessage) {
      setOpen(true);
      setBadge(false);
      setInput(initialMessage);
      onConsumeMessage?.();
    }
  }, [initialMessage]);

  useEffect(() => {
    if (open) {
      setBadge(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = async (text) => {
    const content = text.trim();
    if (!content || typing) return;
    setInput('');

    const newMsg = { role: 'user', content };
    const history = [...messages, newMsg];
    setMessages(history);
    setTyping(true);

    try {
      const apiMessages = history.map(m => ({ role: m.role, content: m.content }));
      const reply = await callClaude(apiMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Désolé, une erreur est survenue. Appelez-nous directement au 0486 09 72 64.',
      }]);
    } finally {
      setTyping(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  const welcome = messages.length === 0;

  return (
    <>
      {/* Floating button */}
      <button
        className={`chat-bubble${open ? ' chat-bubble--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Ouvrir le chat"
      >
        {open ? '✕' : '💬'}
        {badge && !open && <span className="chat-bubble__badge" />}
      </button>

      {/* Chat window */}
      <div className={`chat-window${open ? ' chat-window--open' : ''}`} role="dialog" aria-label="Assistant La Scala">
        {/* Header */}
        <div className="chat-header">
          <Logo size={32} light />
          <div className="chat-header__info">
            <p className="chat-header__name">La Scala</p>
            <p className="chat-header__sub">Assistant IA · En ligne</p>
          </div>
          <button className="chat-header__close" onClick={() => setOpen(false)} aria-label="Fermer">✕</button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {welcome && (
            <div className="chat-welcome">
              <p className="chat-welcome__text">Benvenuto ! 👋</p>
              <p className="chat-welcome__sub">Je suis l'assistant de La Scala. Posez-moi vos questions sur notre restaurant !</p>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`chat-msg chat-msg--${m.role}`}>
              {m.role === 'assistant' && (
                <div className="chat-msg__avatar"><Logo size={20} light /></div>
              )}
              <div className="chat-msg__bubble">{m.content}</div>
            </div>
          ))}

          {typing && (
            <div className="chat-msg chat-msg--assistant">
              <div className="chat-msg__avatar"><Logo size={20} light /></div>
              <div className="chat-msg__bubble chat-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggestions */}
        {welcome && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map((s, i) => (
              <button key={i} className="chat-suggestion" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chat-input-row">
          <input
            ref={inputRef}
            className="chat-input"
            type="text"
            placeholder="Votre question…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={typing}
          />
          <button
            className="chat-send"
            onClick={() => send(input)}
            disabled={typing || !input.trim()}
            aria-label="Envoyer"
          >
            ↑
          </button>
        </div>
      </div>
    </>
  );
}
