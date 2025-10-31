
import React from 'react';
import CountdownTimer from '../CountdownTimer/index';

interface Product {
  id: string;
  title: string;
  imgSrc: string;
  oldPrice: string;
  newPrice: string;
  coupon?: string;
  restam?: number;
  freeShipping?: boolean;
  installments: string;
  ninja?: boolean;
}

const NinjaProductCard = ({ product }: { product: Product }) => {
  const calculateDiscount = (oldPrice: string, newPrice: string): number => {
    const oldP = parseFloat(oldPrice.replace(/[^0-9,-]+/g, '').replace(',', '.'));
    const newP = parseFloat(newPrice.replace(/[^0-9,-]+/g, '').replace(',', '.'));
    if (isNaN(oldP) || isNaN(newP) || oldP === 0) return 0;
    return Math.round(((oldP - newP) / oldP) * 100);
  };

  const discount = calculateDiscount(product.oldPrice, product.newPrice);

  // Estilos inline
  const ninjaProductCardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '280px',
    flexShrink: 0
  };

  const productImageContainerStyle = {
    position: 'relative',
    height: '200px',
    overflow: 'hidden'
  };

  const couponTagStyle = {
    position: 'absolute',
    top: '8px',
    left: '8px',
    backgroundColor: '#ff6600',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    zIndex: 10
  };

  const productImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const stockTagStyle = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    zIndex: 10
  };

  const shippingTagStyle = {
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
    zIndex: 10
  };

  const productTitleStyle = {
    padding: '12px 16px 8px',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    margin: '0',
    lineHeight: '1.4',
    height: '3rem',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  };

  const productPricingStyle = {
    padding: '0 16px 12px'
  };

  const oldPriceStyle = {
    fontSize: '0.875rem',
    color: '#9ca3af',
    textDecoration: 'line-through',
    margin: '0'
  };

  const newPriceContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '4px 0'
  };

  const newPriceStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937'
  };

  const discountTagStyle = {
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 'bold'
  };

  const pixInfoStyle = {
    fontSize: '0.75rem',
    color: '#059669',
    fontWeight: '500',
    margin: '4px 0 0 0'
  };

  const installmentsStyle = {
    fontSize: '0.75rem',
    color: '#6b7280',
    margin: '2px 0 0 0'
  };

  const ninjaFooterStyle = {
    padding: '8px 16px',
    backgroundColor: '#f9fafb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px'
  };

  const primeNinjaLogoStyle = {
    height: '20px',
    width: 'auto'
  };

  return (
    <div style={ninjaProductCardStyle}>
      <div style={productImageContainerStyle}>
        {product.coupon && (
          <span style={couponTagStyle}>
            {product.coupon}
          </span>
        )}
        <img
          src={product.imgSrc}
          alt={product.title}
          style={productImageStyle}
        />
        {product.restam > 0 && (
          <span style={stockTagStyle}>
            Restam {product.restam} unid.
          </span>
        )}
        {product.freeShipping && (
          <span style={shippingTagStyle}>
            <i className="pi pi-truck"></i>
            Frete grátis
          </span>
        )}
      </div>

      <p style={productTitleStyle}>
        {product.title}
      </p>

      <div style={productPricingStyle}>
        <span style={oldPriceStyle}>{product.oldPrice}</span>
        <div style={newPriceContainerStyle}>
          <div style={newPriceStyle}>{product.newPrice}</div>
          {discount > 0 && (
            <span style={discountTagStyle}>
              -{discount}%
            </span>
          )}
        </div>
        <p style={pixInfoStyle}>
          no PIX
        </p>
        <p style={installmentsStyle}>{product.installments}</p>
      </div>

      <div style={ninjaFooterStyle}>
        {product.ninja && (
          <img
            src="https://placehold.co/100x20/003399/FFFFFF?text=PRIME+NINJA"
            alt="Prime Ninja"
            style={primeNinjaLogoStyle}
          />
        )}
        <CountdownTimer compact={true} />
      </div>
    </div>
  );
}

export default NinjaProductCard;
