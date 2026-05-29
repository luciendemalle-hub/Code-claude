import Logo from './Logo';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__logo reveal">
          <Logo size={64} light />
          <p className="footer__brand-name">La Scala</p>
          <p className="footer__brand-sub">Cucina Autentica</p>
        </div>

        <div className="footer__divider" />

        <div className="footer__info reveal">
          <div className="footer__col">
            <h3 className="footer__col-title">Adresse</h3>
            <a
              href="https://maps.google.com/?q=Rue+du+Village+64,5030+Gembloux"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              Rue du Village 64<br />5030 Sauvenière (Gembloux)
            </a>
          </div>
          <div className="footer__col">
            <h3 className="footer__col-title">Contact</h3>
            <a href="tel:0486097264" className="footer__link">
              0486 09 72 64
            </a>
          </div>
          <div className="footer__col">
            <h3 className="footer__col-title">Horaires</h3>
            <p className="footer__text">Lun – Ven</p>
            <p className="footer__text">12h00 – 14h00</p>
            <p className="footer__text">18h30 – 21h30</p>
            <p className="footer__text footer__text--muted">Sam – Dim : Fermé</p>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom reveal">
          <p className="footer__copy">
            © {new Date().getFullYear()} La Scala – Cucina Autentica. Tous droits réservés.
          </p>
          <p className="footer__ai">✨ Site créé avec IA</p>
        </div>
      </div>
    </footer>
  );
}
