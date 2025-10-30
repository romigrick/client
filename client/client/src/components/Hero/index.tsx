
import React from 'react';
import './index.css';

const Hero = () => {
  return (
    <section className="hero-container">
      {/* Banner % OFF */}
      <div className="hero-banner-left">
        <img 
          src="https://placehold.co/300x410/ff6600/ffffff?text=%25+OFF+NO+PIX" 
          alt="Banner de Ofertas % OFF"
          className="hero-image"
        />
      </div>
      
      {/* Banner Festival de Cupons */}
      <div className="hero-banner-right">
        <img 
          src="https://placehold.co/850x410/003399/FFFFFF?text=FESTIVAL+DE+CUPONS" 
          alt="Banner Festival de Cupons"
          className="hero-image"
        />
        <div className="app-exclusive-tag">
          <i className="pi pi-mobile"></i>
          Exclusivo no APP
        </div>
      </div>
    </section>
  );
}

export default Hero;
