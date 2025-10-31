import React from 'react';
import type { IProduct } from '../../commons/types';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Função para renderizar estrelas de avaliação
  const renderStars = (rating: number, reviewCount: number) => {
    let stars = [];
    if (reviewCount === 0) {
      return <div className="h-5"></div>; // Espaço reservado
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
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={imageUrl}
          alt={product.name}
          className="product-image"
        />
      </div>

      {renderStars(5, 0)} {/* Placeholder para estrelas */}

      <p className="product-title">
        {product.name}
      </p>

      <div className="product-pricing">
        <div className="new-price">
          {formatPrice(product.price)}
          <span className="price-label">à vista</span>
        </div>
        <p className="pix-info">
          no PIX
        </p>
        <p className="installments">ou 10x de {formatPrice(product.price / 10)}</p>
      </div>
    </div>
  );
}

export default ProductCard;
