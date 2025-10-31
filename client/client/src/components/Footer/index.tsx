
import React, { useState, useEffect } from 'react';
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

  const footerStyle = {
    backgroundColor: '#374151',
    color: '#9ca3af',
    paddingTop: '2.5rem',
    position: 'relative'
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem'
  };

  const backToTopStyle = {
    position: 'absolute',
    top: '-1.25rem',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#4b5563',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem',
    marginBottom: '2rem'
  };

  const columnStyle = {};

  const titleStyle = {
    fontWeight: 700,
    color: 'white',
    marginBottom: '0.75rem'
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    fontSize: '0.875rem'
  };

  const buttonStyle = {
    marginTop: '1rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#f97316',
    color: 'white',
    fontWeight: 700,
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    textDecoration: 'none'
  };

  const linkHighlightStyle = {
    color: '#fb923c',
    textDecoration: 'none'
  };

  const institutionalStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5rem 1rem',
    fontSize: '0.875rem'
  };

  const linkStyle = {
    color: '#9ca3af',
    textDecoration: 'none'
  };

  const socialAppsStyle = {
    borderTop: '1px solid #4b5563',
    paddingTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem'
  };

  const socialMediaStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const appDownloadsStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const iconsStyle = {
    display: 'flex',
    gap: '0.75rem'
  };

  const iconStyle = {
    padding: '0.5rem',
    backgroundColor: '#4b5563',
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none'
  };

  const appButtonsStyle = {
    display: 'flex',
    gap: '0.75rem'
  };

  const appButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#4b5563',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    textDecoration: 'none',
    color: 'white'
  };

  const bottomBarStyle = {
    backgroundColor: '#1f2937',
    marginTop: '2.5rem',
    padding: '1.5rem 0'
  };

  const bottomContentStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem',
    textAlign: 'center',
    fontSize: '0.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  };

  const logoStyle = {
    height: '4rem',
    margin: '0 auto 1rem auto'
  };

  const blueTextStyle = {
    fontWeight: 700,
    color: '#60a5fa'
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            style={backToTopStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6b7280')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4b5563')}
          >
            <i className="pi pi-chevron-up" style={{ marginRight: '0.25rem' }}></i>
            VER MAIS
          </button>
        )}

        <div style={gridStyle}>
          {/* Atendimento */}
          <div style={columnStyle}>
            <h4 style={titleStyle}>Atendimento</h4>
            <ul style={listStyle}>
              <li>08:00 às 20:00 - Segunda a Sábado</li>
              <li>08:00 às 15:00 - Sábado, horário de Brasília (exceto Domingo e feriados).</li>
            </ul>
            <a
              href="#"
              style={buttonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea580c')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
            >
              <i className="pi pi-comments"></i>
              FALE CONOSCO
            </a>
          </div>

          {/* Vendas Pessoa Jurídica */}
          <div style={columnStyle}>
            <h4 style={titleStyle}>Vendas Pessoa Jurídica</h4>
            <ul style={listStyle}>
              <li>08:00 às 20:00 - Segunda a Sexta</li>
              <li>08:00 às 15:00 - Sábado, horário de Brasília (exceto Domingo e feriados).</li>
              <li style={{ paddingTop: '0.5rem' }}>
                Fale conosco via{' '}
                <a
                  href="#"
                  style={linkHighlightStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  chat
                </a>{' '}
                ou pelo email:
              </li>
              <li>vendas@Katchau.com.br</li>
            </ul>
          </div>

          {/* Loja Física */}
          <div style={columnStyle}>
            <h4 style={titleStyle}>Loja Física</h4>
            <ul style={listStyle}>
              <li>08:00 às 20:00 - Segunda a Sábado, horário de Brasília (exceto Domingo e feriados).</li>
              <li style={{ paddingTop: '0.5rem' }}>
                Loja Itajubá: Amazonas da Silva, 27 - Vila Guilherme - São Paulo/SP, 02067-000
              </li>
            </ul>
          </div>

          {/* Institucional */}
          <div style={columnStyle}>
            <h4 style={titleStyle}>Institucional</h4>
            <div style={institutionalStyle}>
              <a
                href="#"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fb923c')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                Sobre o Katchau!
              </a>
              <a
                href="#"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fb923c')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                Políticas de Cookies
              </a>
              {/* ... other links */}
            </div>
          </div>
        </div>

        <div style={socialAppsStyle}>
          {/* Mídias Sociais */}
          <div style={socialMediaStyle}>
            <h4 style={titleStyle}>Mídias sociais:</h4>
            <div style={iconsStyle}>
              <a
                href="#"
                style={iconStyle}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4b5563')}
              >
                <i className="pi pi-facebook"></i>
              </a>
              <a
                href="#"
                style={iconStyle}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4b5563')}
              >
                <i className="pi pi-instagram"></i>
              </a>
              <a
                href="#"
                style={iconStyle}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4b5563')}
              >
                <i className="pi pi-twitter"></i>
              </a>
              <a
                href="#"
                style={iconStyle}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4b5563')}
              >
                <i className="pi pi-linkedin"></i>
              </a>
              <a
                href="#"
                style={iconStyle}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4b5563')}
              >
                <i className="pi pi-youtube"></i>
              </a>
            </div>
          </div>

          {/* Apps */}
          <div style={appDownloadsStyle}>
            <h4 style={titleStyle}>Baixe os aplicativos:</h4>
            <div style={appButtonsStyle}>
              <a
                href="#"
                style={appButtonStyle}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6b7280')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4b5563')}
              >
                <i className="pi pi-apple" style={{ marginRight: '0.5rem', fontSize: '1.5rem' }}></i>
                <div>
                  <span style={{ fontSize: '0.75rem', display: 'block' }}>Baixar na</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>App Store</span>
                </div>
              </a>
              <a
                href="#"
                style={appButtonStyle}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6b7280')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4b5563')}
              >
                <i className="pi pi-google" style={{ marginRight: '0.5rem', fontSize: '1.5rem' }}></i>
                <div>
                  <span style={{ fontSize: '0.75rem', display: 'block' }}>Disponível no</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Faixa Inferior */}
      <div style={bottomBarStyle}>
        <div style={bottomContentStyle}>
          <img src={logoImage} alt="Katchau Logo" style={logoStyle} />
          <p>
            Uma empresa do grupo <span style={blueTextStyle}>Inside Studio</span>
          </p>
          <p>Rua Doutor Francisco Beltrão, 360 - AP 112 - Santa Terezinha, Pato Branco/PR - CEP 85501-190 | Inside Studio | Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
