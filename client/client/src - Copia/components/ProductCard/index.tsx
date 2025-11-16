import React from 'react';
import type { IProduct } from '../../commons/types';

interface ProductCardProps {
  product: IProduct;
}

const productCardStyle: React.CSSProperties = {
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
  width: '180px',
  textAlign: 'center',
};

const productImageContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '200px',
  overflow: 'hidden',
  borderRadius: '4px',
};

const productImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
};

const productTitleStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#1f2937',
  lineHeight: 1.4,
  margin: 0,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
};

const productPricingStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
};

const newPriceStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#1f2937',
  display: 'flex',
  alignItems: 'baseline',
  gap: '4px',
  justifyContent: 'center',
};

const priceLabelStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#6b7280',
  fontWeight: 'normal',
};

const pixInfoStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#059669',
  fontWeight: 500,
  margin: 0,
};

const installmentsStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#6b7280',
  margin: 0,
};

const starsContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  justifyContent: 'center',
};

const starFilledStyle: React.CSSProperties = {
  color: '#fbbf24',
  fontSize: '16px',
};

const starEmptyStyle: React.CSSProperties = {
  color: '#d1d5db',
  fontSize: '16px',
};

const reviewCountStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#6b7280',
  marginLeft: '4px',
};

const ProductCard = ({ product }: ProductCardProps) => {
  // Função para renderizar estrelas de avaliação
  const renderStars = (rating: number, reviewCount: number) => {
    let stars = [];
    if (reviewCount === 0) {
      return null;
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

  // Função para formatar preço
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  // URL da imagem do produto
  const imageUrl = product.urlImagem || 'https://placehold.co/250x250/eee/333?text=Produto';

  return (
    <div style={productCardStyle}>
      <div style={productImageContainerStyle}>
        <img
          src={imageUrl}
          alt={product.name}
          style={productImageStyle}
        />
      </div>

      {renderStars(5, 0)} {/* Placeholder para estrelas */}

      <p style={productTitleStyle}>
        {product.name}
      </p>

      <div style={productPricingStyle}>
        <div style={newPriceStyle}>
          {formatPrice(product.price)}
          <span style={priceLabelStyle}>à vista</span>
        </div>
        <p style={pixInfoStyle}>
          no PIX
        </p>
        <p style={installmentsStyle}>ou 10x de {formatPrice(product.price / 10)}</p>
      </div>
    </div>
  );
}

export default ProductCard;
