
import React, { useState, useEffect } from 'react';
import './Footer.css';
import logoImage from '@/assets/katchau_logo.png';


const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="back-to-top-button"
          >
            <i className="pi pi-chevron-up"></i>
            VER MAIS
          </button>
        )}
        
        <div className="footer-grid">
          {/* Atendimento */}
          <div className="footer-column">
            <h4 className="footer-title">Atendimento</h4>
            <ul className="footer-list">
              <li>08:00 às 20:00 - Segunda a Sábado</li>
              <li>08:00 às 15:00 - Sábado, horário de Brasília (exceto Domingo e feriados).</li>
            </ul>
            <a href="#" className="contact-button">
              <i className="pi pi-comments"></i>
              FALE CONOSCO
            </a>
          </div>

          {/* Vendas Pessoa Jurídica */}
          <div className="footer-column">
            <h4 className="footer-title">Vendas Pessoa Jurídica</h4>
            <ul className="footer-list">
              <li>08:00 às 20:00 - Segunda a Sexta</li>
              <li>08:00 às 15:00 - Sábado, horário de Brasília (exceto Domingo e feriados).</li>
              <li className="pt-2">Fale conosco via <a href="#" className="footer-link-highlight">chat</a> ou pelo email:</li>
              <li>vendas@Katchau.com.br</li>
            </ul>
          </div>

          {/* Loja Física */}
          <div className="footer-column">
            <h4 className="footer-title">Loja Física</h4>
            <ul className="footer-list">
              <li>08:00 às 20:00 - Segunda a Sábado, horário de Brasília (exceto Domingo e feriados).</li>
              <li className="pt-2">Loja Itajubá: Amazonas da Silva, 27 - Vila Guilherme - São Paulo/SP, 02067-000</li>
            </ul>
          </div>

          {/* Institucional */}
          <div className="footer-column">
            <h4 className="footer-title">Institucional</h4>
            <div className="institutional-links">
              <a href="#" className="footer-link">Sobre o Katchau!</a>
              <a href="#" className="footer-link">Políticas de Cookies</a>
              {/* ... other links */}
            </div>
          </div>
        </div>

        <div className="footer-social-apps">
          {/* Mídias Sociais */}
          <div className="social-media">
            <h4 className="footer-title">Mídias sociais:</h4>
            <div className="social-icons">
              <a href="#" className="social-icon"><i className="pi pi-facebook"></i></a>
              <a href="#" className="social-icon"><i className="pi pi-instagram"></i></a>
              <a href="#" className="social-icon"><i className="pi pi-twitter"></i></a>
              <a href="#" className="social-icon"><i className="pi pi-linkedin"></i></a>
              <a href="#" className="social-icon"><i className="pi pi-youtube"></i></a>
            </div>
          </div>

          {/* Apps */}
          <div className="app-downloads">
            <h4 className="footer-title">Baixe os aplicativos:</h4>
            <div className="app-buttons">
              <a href="#" className="app-button">
                <i className="pi pi-apple"></i>
                <div>
                  <span className="app-button-subtitle">Baixar na</span>
                  <span className="app-button-title">App Store</span>
                </div>
              </a>
              <a href="#" className="app-button">
                <i className="pi pi-google"></i>
                <div>
                  <span className="app-button-subtitle">Disponível no</span>
                  <span className="app-button-title">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Faixa Inferior */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-content">
          <img src={logoImage} alt="Katchau Logo" className="footer-logo" />
          <p>Uma empresa do grupo <span className="magalu-text">Inside Studio</span></p>
          <p>Rua Doutor Francisco Beltrão, 360 - AP 112 - Santa Terezinha, Pato Branco/PR - CEP 85501-190 | Inside Studio | Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
