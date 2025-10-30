
import React from 'react';
import './index.css';

const ProductCard = ({ product }) => {
  
  // Função para renderizar estrelas de avaliação
  const renderStars = (rating, reviewCount) => {
    let stars = [];
    if (reviewCount === 0) {
      return <div className="stars-placeholder"></div>; // Espaço reservado
    }
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`pi pi-star-fill ${i <= rating ? 'star-filled' : 'star-empty'}`}
        />
      );
    }
    stars.push(<span key="count" className="review-count">({reviewCount})</span>);
    return <div className="stars-container">{stars}</div>;
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.imgSrc} 
          alt={product.title} 
          className="product-image"
        />
        {product.freeShipping && (
          <span className="shipping-tag">
            <i className="pi pi-truck"></i>
            Frete grátis
          </span>
        )}
      </div>
      
      {renderStars(product.rating, product.reviewCount)}

      <p className="product-title">
        {product.title}
      </p>
      
      <div className="product-pricing">
        <span className="old-price">{product.oldPrice}</span>
        <div className="new-price">
          {product.newPrice}
          <span className="price-label">à vista</span>
        </div>
        <p className="pix-info">
          no PIX com {Math.round((1 - parseFloat(product.newPrice.replace(/[^0-9,-]+/g, '').replace(',', '.')) / parseFloat(product.oldPrice.replace(/[^0-9,-]+/g, '').replace(',', '.'))) * 100)}% desconto
        </p>
        <p className="installments">{product.installments}</p>
      </div>
    </div>
  );
}

export default ProductCard;
