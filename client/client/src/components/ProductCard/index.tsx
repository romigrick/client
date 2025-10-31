
import React from 'react';

interface Product {
  imgSrc: string;
  title: string;
  rating: number;
  reviewCount: number;
  oldPrice: string;
  newPrice: string;
  installments: string;
  freeShipping?: boolean;
}

const ProductCard = ({ product }: { product: Product }) => {

  // Estilos inline
  const productCardStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.2s',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '280px'
  };

  const productImageContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    borderRadius: '4px'
  };

  const productImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const shippingTagStyle = {
    position: 'absolute',
    top: '8px',
    left: '8px',
    backgroundColor: '#10b981',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const starsContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const starFilledStyle = {
    color: '#fbbf24',
    fontSize: '16px'
  };

  const starEmptyStyle = {
    color: '#d1d5db',
    fontSize: '16px'
  };

  const reviewCountStyle = {
    fontSize: '14px',
    color: '#6b7280',
    marginLeft: '4px'
  };

  const productTitleStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1f2937',
    lineHeight: '1.4',
    margin: '0',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const productPricingStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const oldPriceStyle = {
    fontSize: '14px',
    color: '#6b7280',
    textDecoration: 'line-through'
  };

  const newPriceStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px'
  };

  const priceLabelStyle = {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: 'normal'
  };

  const pixInfoStyle = {
    fontSize: '12px',
    color: '#059669',
    fontWeight: '500',
    margin: '0'
  };

  const installmentsStyle = {
    fontSize: '12px',
    color: '#6b7280',
    margin: '0'
  };

  // Função para renderizar estrelas de avaliação
  const renderStars = (rating: number, reviewCount: number) => {
    let stars = [];
    if (reviewCount === 0) {
      return <div style={{ height: '20px' }}></div>; // Espaço reservado
    }
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className="pi pi-star-fill"
          style={i <= rating ? starFilledStyle : starEmptyStyle}
        />
      );
    }
    stars.push(<span key="count" style={reviewCountStyle}>({reviewCount})</span>);
    return <div style={starsContainerStyle}>{stars}</div>;
  };

  return (
    <div style={productCardStyle}>
      <div style={productImageContainerStyle}>
        <img
          src={product.imgSrc}
          alt={product.title}
          style={productImageStyle}
        />
        {product.freeShipping && (
          <span style={shippingTagStyle}>
            <i className="pi pi-truck"></i>
            Frete grátis
          </span>
        )}
      </div>

      {renderStars(product.rating, product.reviewCount)}

      <p style={productTitleStyle}>
        {product.title}
      </p>

      <div style={productPricingStyle}>
        <span style={oldPriceStyle}>{product.oldPrice}</span>
        <div style={newPriceStyle}>
          {product.newPrice}
          <span style={priceLabelStyle}>à vista</span>
        </div>
        <p style={pixInfoStyle}>
          no PIX com {Math.round((1 - parseFloat(product.newPrice.replace(/[^0-9,-]+/g, '').replace(',', '.')) / parseFloat(product.oldPrice.replace(/[^0-9,-]+/g, '').replace(',', '.'))) * 100)}% desconto
        </p>
        <p style={installmentsStyle}>{product.installments}</p>
      </div>
    </div>
  );
}

export default ProductCard;
