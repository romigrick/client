
import React from 'react';
import { mockProducts } from '../data/mockData';
import ProductCard from './ProductCard';
import './ProductCarousel.css';

const ProductCarousel = () => {
  // Em uma aplicação real, o scroll seria controlado por JS
  // Aqui, usamos overflow-x-auto para scroll nativo
  return (
    <section className="carousel-section">
      <div className="carousel-container">
        <button className="carousel-button prev">
          <i className="pi pi-chevron-left" />
        </button>
        <div className="carousel-scroll-area">
          {mockProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <button className="carousel-button next">
          <i className="pi pi-chevron-right" />
        </button>
      </div>
    </section>
  );
}

export default ProductCarousel;
