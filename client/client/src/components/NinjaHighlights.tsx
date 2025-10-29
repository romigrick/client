
import React, { useState } from 'react';
import { ninjaProducts } from '../data/mockData';
import NinjaProductCard from './NinjaProductCard';
import './NinjaHighlights.css';

const NinjaHighlights = () => {
  const categories = [
    "TODOS", "AR E VENTILAÇÃO", "ÁUDIO", "CÂMERAS E DRONES", "CELULAR & SMARTPHONE", "COMPUTADORES", "CONECTIVIDADE", "ELETROPORTÁTEIS", "ESPAÇO GAMER"
  ];
  const [activeTab, setActiveTab] = useState("TODOS");

  return (
    <section className="ninja-section">
      <div className="ninja-header">
        <div className="ninja-title-container">
          <span className="ninja-title-decorator"></span>
          <h2 className="ninja-title">DESTAQUES NINJA</h2>
        </div>
        <a href="#" className="ninja-view-all">
          VER TODOS {'>'}
        </a>
      </div>

      {/* Abas de Categoria */}
      <div className="tabs-container">
        <div className="tabs-scroll-area">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`tab-button ${activeTab === category ? 'active' : ''}`}>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Carrossel de Produtos Ninja */}
      <div className="carousel-container">
        <button className="carousel-button prev">
          <i className="pi pi-chevron-left" />
        </button>
        <div className="carousel-scroll-area">
          {ninjaProducts.map(product => (
            <NinjaProductCard key={product.id} product={product} />
          ))}
        </div>
        <button className="carousel-button next">
          <i className="pi pi-chevron-right" />
        </button>
      </div>
    </section>
  );
}

export default NinjaHighlights;
