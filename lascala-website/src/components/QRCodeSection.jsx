import { QRCodeSVG } from 'qrcode.react';
import './QRCodeSection.css';

export default function QRCodeSection() {
  return (
    <section className="qrsection" id="qrcode">
      <div className="qrsection__inner reveal">
        <span className="qrsection__eyebrow">Interactivité à table</span>
        <h2 className="qrsection__title">Votre assistant culinaire</h2>
        <p className="qrsection__desc">
          Scannez le QR code avec votre téléphone pour accéder à notre menu interactif
          et poser toutes vos questions à notre assistant IA.
        </p>

        <div className="qrsection__qr-wrap">
          <div className="qrsection__glow" />
          <div className="qrsection__qr-frame">
            <QRCodeSVG
              value="https://lascala-gembloux.be/menu-ia"
              size={180}
              fgColor="#8B1A1A"
              bgColor="transparent"
              level="M"
            />
          </div>
          <div className="qrsection__scan-line" />
        </div>

        <p className="qrsection__cta">
          📱 Scannez à table pour poser vos questions
        </p>
        <p className="qrsection__url">lascala-gembloux.be/menu-ia</p>
      </div>
    </section>
  );
}
