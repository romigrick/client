import React from 'react';
import './ProductSection.css';

const ProductSection = () => {
  return (
    <section className="product-section">
      <h2 className="section-title">As Melhores Ofertas</h2>
      <div className="product-grid">
        {/* Product cards will be loaded here from the backend */}
        <p>Carregando produtos...</p>
      </div>
    </section>
  );
};

export default ProductSection;