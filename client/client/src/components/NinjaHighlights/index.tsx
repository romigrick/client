
import React, { useState } from 'react';
import { ninjaProducts } from '../../data/mockData';
import NinjaProductCard from '../NinjaProductCard/index';

const NinjaHighlights = () => {
  const categories = [
    "TODOS", "AR E VENTILAÇÃO", "ÁUDIO", "CÂMERAS E DRONES", "CELULAR & SMARTPHONE", "COMPUTADORES", "CONECTIVIDADE", "ELETROPORTÁTEIS", "ESPAÇO GAMER"
  ];
  const [activeTab, setActiveTab] = useState("TODOS");

  // Estilos inline
  const ninjaSectionStyle = {
    padding: '3rem 1rem',
    backgroundColor: '#f9fafb'
  };

  const ninjaHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    maxWidth: '1200px',
    margin: '0 auto 2rem auto'
  };

  const ninjaTitleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const ninjaTitleDecoratorStyle = {
    width: '4px',
    height: '2rem',
    backgroundColor: '#ff6600'
  };

  const ninjaTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0'
  };

  const ninjaViewAllStyle = {
    color: '#ff6600',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.875rem'
  };

  const tabsContainerStyle = {
    marginBottom: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const tabsScrollAreaStyle = {
    display: 'flex',
    gap: '0.5rem',
    overflowX: 'auto',
    paddingBottom: '0.5rem'
  };

  const tabButtonStyle = (isActive: boolean) => ({
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.375rem',
    backgroundColor: isActive ? '#ff6600' : '#e5e7eb',
    color: isActive ? 'white' : '#374151',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s'
  });

  const carouselContainerStyle = {
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const carouselButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'white',
    border: '1px solid #d1d5db',
    borderRadius: '50%',
    width: '2.5rem',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    zIndex: 10
  };

  const carouselScrollAreaStyle = {
    display: 'flex',
    gap: '1rem',
    overflowX: 'auto',
    padding: '1rem',
    scrollBehavior: 'smooth'
  };

  return (
    <section style={ninjaSectionStyle}>
      <div style={ninjaHeaderStyle}>
        <div style={ninjaTitleContainerStyle}>
          <span style={ninjaTitleDecoratorStyle}></span>
          <h2 style={ninjaTitleStyle}>DESTAQUES NINJA</h2>
        </div>
        <a href="#" style={ninjaViewAllStyle}>
          VER TODOS {'>'}
        </a>
      </div>

      {/* Abas de Categoria */}
      <div style={tabsContainerStyle}>
        <div style={tabsScrollAreaStyle}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              style={tabButtonStyle(activeTab === category)}>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Carrossel de Produtos Ninja */}
      <div style={carouselContainerStyle}>
        <button style={{...carouselButtonStyle, left: '-1rem'}} className="prev">
          <i className="pi pi-chevron-left" />
        </button>
        <div style={carouselScrollAreaStyle}>
          {ninjaProducts.map(product => (
            <NinjaProductCard key={product.id} product={product} />
          ))}
        </div>
        <button style={{...carouselButtonStyle, right: '-1rem'}} className="next">
          <i className="pi pi-chevron-right" />
        </button>
      </div>
    </section>
  );
}

export default NinjaHighlights;
