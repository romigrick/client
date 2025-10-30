import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/hooks/use-auth';
// import { Menu } from 'primereact/menu'; // Temporarily removed for debugging
import { Button } from 'primereact/button';
import './index.css';
import logoImage from '@/assets/katchau_logo.png';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { authenticated, authenticatedUser, handleLogout } = useAuth();
  const navigate = useNavigate();

  const AuthDisplay = () => {
    if (authenticated) {
      return (
        <div className="login-desktop">
          <span style={{marginRight: '1rem'}}>Olá, {authenticatedUser?.displayName}</span>
          <button onClick={() => { handleLogout(); }} className="p-button p-button-sm p-button-danger">Sair</button>
        </div>
      );
    } else {
      return (
        <Link to="/login" className="login-desktop">
          <i className="pi pi-user" />
          <div className="login-text">
            <div>Entre ou</div>
            <div className="font-bold">Cadastre-se</div>
          </div>
        </Link>
      );
    }
  };

  return (
    <header className="header-sticky">
      <div className="header-container">
        <div className="header-content">
          <div className="header-left">
            <button onClick={() => setMobileMenuOpen(true)} className="mobile-menu-button">
              <i className="pi pi-bars" />
            </button>
            <Link to="/">
              <img src={logoImage} alt="Katchau Logo" className="logo-image" />
            </Link>
          </div>

          <div className="header-center">
            <div className="send-to-desktop">
              <i className="pi pi-map-marker" />
              <div className="send-to-text">
                <div>Enviar para</div>
                <div className="font-bold">Digite o CEP</div>
              </div>
            </div>
            <div className="search-bar-wrapper">
              <input type="text" placeholder="Busque no Katchau!" className="search-input" />
              <button className="search-button"><i className="pi pi-search" /></button>
            </div>
          </div>

          <div className="header-right">
            <div className="actions-desktop">
              <a href="#" className="action-icon"><i className="pi pi-star" /></a>
              <a href="#" className="action-icon"><i className="pi pi-bell" /></a>
              <a href="#" className="action-icon"><i className="pi pi-heart" /></a>
              <a href="#" className="action-icon cart-icon"><i className="pi pi-shopping-cart" /></a>
            </div>
            <AuthDisplay />
          </div>

          <div className="cart-mobile">
            <a href="#" className="action-icon cart-icon"><i className="pi pi-shopping-cart" /></a>
          </div>
        </div>
      </div>

      <nav className="navbar-desktop">
        <div className="navbar-container">
          <a href="#" className="offer-link">
            <i className="pi pi-tag" />
            <span>OFERTAS</span>
            <i className="pi pi-chevron-down" />
          </a>
          <a href="#" className="nav-link">Hardware</a>
          <a href="#" className="nav-link">Periféricos</a>
          <a href="#" className="nav-link">Computadores</a>
          <a href="#" className="nav-link">Monitores</a>
          <a href="#" className="nav-link">Games</a>
          <a href="#" className="nav-link">Smart Home</a>
          <a href="#" className="nav-link">Celular</a>
        </div>
      </nav>

      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <div 
          className={`mobile-menu-content ${mobileMenuOpen ? 'active' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-menu-header">
            {authenticated ? (
              <div className="mobile-login">
                <i className="pi pi-user" />
                <div className="login-text">
                  <div>Olá,</div>
                  <div className="font-bold">{authenticatedUser?.displayName}</div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="mobile-login" onClick={() => setMobileMenuOpen(false)}>
                <i className="pi pi-user" />
                <div className="login-text">
                  <div>Entre ou</div>
                  <div className="font-bold">Cadastre-se</div>
                </div>
              </Link>
            )}
            <button onClick={() => setMobileMenuOpen(false)} className="close-button">
              <i className="pi pi-times" />
            </button>
          </div>
          
          <div className="mobile-send-to">
            <i className="pi pi-map-marker" />
            <div className="send-to-text">
              <div>Enviar para</div>
              <div className="font-bold">Digite o CEP</div>
            </div>
          </div>
          
          <nav className="mobile-nav">
            <a href="#" className="mobile-nav-link offer"><span>OFERTAS</span><i className="pi pi-chevron-right" /></a>
            <a href="#" className="mobile-nav-link"><span>Hardware</span><i className="pi pi-chevron-right" /></a>
            <a href="#" className="mobile-nav-link"><span>Periféricos</span><i className="pi pi-chevron-right" /></a>
            <a href="#" className="mobile-nav-link"><span>Computadores</span><i className="pi pi-chevron-right" /></a>
            <a href="#" className="mobile-nav-link"><span>Monitores</span><i className="pi pi-chevron-right" /></a>
          </nav>

          <div className="mobile-actions">
            <a href="#" className="mobile-action-icon"><i className="pi pi-bell" /></a>
            <a href="#" className="mobile-action-icon"><i className="pi pi-heart" /></a>
            {authenticated && (
              <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); setMobileMenuOpen(false); }} className="mobile-action-icon">
                <i className="pi pi-sign-out" />
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
