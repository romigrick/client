import React from 'react';
import CountdownTimer from '../CountdownTimer/index';
import { useCart } from '../../context/hooks/use-cart';
import type { IProduct } from '../../commons/types';

const ninjaProductCardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  width: '250px',
  flexShrink: 0,
};

const ninjaProductImageContainerStyle: React.CSSProperties = {
  position: 'relative',
  height: '200px',
  overflow: 'hidden',
};

const ninjaCouponTagStyle: React.CSSProperties = {
  position: 'absolute',
  top: '8px',
  left: '8px',
  backgroundColor: '#ff6600',
  color: 'white',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  zIndex: 10,
};

const ninjaProductImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
};

const ninjaStockTagStyle: React.CSSProperties = {
  position: 'absolute',
  top: '8px',
  right: '8px',
  backgroundColor: '#dc2626',
  color: 'white',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  zIndex: 10,
};

const ninjaShippingTagStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '8px',
  left: '8px',
  backgroundColor: '#16a34a',
  color: 'white',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  zIndex: 10,
};

const ninjaProductTitleStyle: React.CSSProperties = {
  padding: '12px 16px 8px',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#374151',
  margin: 0,
  lineHeight: 1.4,
  height: '3rem',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  textAlign: 'center',
};

const ninjaProductPricingStyle: React.CSSProperties = {
  padding: '0 16px 12px',
  textAlign: 'center',
};

const ninjaOldPriceStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: '#9ca3af',
  textDecoration: 'line-through',
  margin: 0,
};

const ninjaNewPriceContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  margin: '4px 0',
  justifyContent: 'center',
};

const ninjaNewPriceStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '#1f2937',
};

const ninjaDiscountTagStyle: React.CSSProperties = {
  backgroundColor: '#dc2626',
  color: 'white',
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
};

const ninjaPixInfoStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#059669',
  fontWeight: 500,
  margin: '4px 0 0 0',
};

const ninjaInstallmentsStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#6b7280',
  margin: '2px 0 0 0',
};

const ninjaFooterStyle: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#f9fafb',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
};

const ninjaLogoStyle: React.CSSProperties = {
  height: '20px',
  width: 'auto',
};

const NinjaProductCard = ({ product }: { product: IProduct }) => {
  const { addToCart } = useCart();

  const calculateDiscount = (oldPrice: number, newPrice: number): number => {
    if (oldPrice === 0) return 0;
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };

  const discount = calculateDiscount(product.price, product.price); // Assuming no old price in IProduct, using same price

  // Função para formatar preço
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  // Função para adicionar ao carrinho
  const handleAddToCart = () => {
    addToCart(product);
  };

  // URL da imagem do produto
  const imageUrl = product.urlImagem || 'https://placehold.co/250x250/eee/333?text=Produto';

  return (
    <div style={ninjaProductCardStyle}>
      <div style={ninjaProductImageContainerStyle}>
        <span style={ninjaCouponTagStyle}>
          CUPOM SUPERTERCA
        </span>
        <img
          src={imageUrl}
          alt={product.name}
          style={ninjaProductImageStyle}
        />
        <span style={ninjaStockTagStyle}>
          Restam 5 unid.
        </span>
        <span style={ninjaShippingTagStyle}>
          <i className="pi pi-truck"></i>
          Frete grátis
        </span>
      </div>

      <p style={ninjaProductTitleStyle}>
        {product.name}
      </p>

      <div style={ninjaProductPricingStyle}>
        <span style={ninjaOldPriceStyle}>{formatPrice(product.price * 1.2)}</span>
        <div style={ninjaNewPriceContainerStyle}>
          <div style={ninjaNewPriceStyle}>{formatPrice(product.price)}</div>
          {discount > 0 && (
            <span style={ninjaDiscountTagStyle}>
              -{discount}%
            </span>
          )}
        </div>
        <p style={ninjaPixInfoStyle}>
          no PIX
        </p>
        <p style={ninjaInstallmentsStyle}>ou 10x de {formatPrice(product.price / 10)}</p>
      </div>

      <div style={ninjaFooterStyle}>
        <button
          onClick={handleAddToCart}
          style={{
            backgroundColor: '#ff6600',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            marginRight: '8px'
          }}
        >
          Adicionar ao Carrinho
        </button>
        <img
          src="https://placehold.co/100x20/003399/FFFFFF?text=PRIME+NINJA"
          alt="Prime Ninja"
          style={ninjaLogoStyle}
        />
        <CountdownTimer compact={true} />
      </div>
    </div>
  );
}

export default NinjaProductCard;
