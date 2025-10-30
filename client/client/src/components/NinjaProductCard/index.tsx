
import React from 'react';
import CountdownTimer from '../CountdownTimer/index';
import './index.css';

const NinjaProductCard = ({ product }) => {
  const calculateDiscount = (oldPrice, newPrice) => {
    const oldP = parseFloat(oldPrice.replace(/[^0-9,-]+/g, '').replace(',', '.'));
    const newP = parseFloat(newPrice.replace(/[^0-9,-]+/g, '').replace(',', '.'));
    if (isNaN(oldP) || isNaN(newP) || oldP === 0) return 0;
    return Math.round(((oldP - newP) / oldP) * 100);
  };

  const discount = calculateDiscount(product.oldPrice, product.newPrice);

  return (
    <div className="ninja-product-card">
      <div className="product-image-container">
        {product.coupon && (
          <span className="coupon-tag">
            {product.coupon}
          </span>
        )}
        <img 
          src={product.imgSrc} 
          alt={product.title} 
          className="product-image"
        />
        {product.restam > 0 && (
          <span className="stock-tag">
            Restam {product.restam} unid.
          </span>
        )}
        {product.freeShipping && (
          <span className="shipping-tag">
            <i className="pi pi-truck"></i>
            Frete grátis
          </span>
        )}
      </div>
      
      <p className="product-title">
        {product.title}
      </p>
      
      <div className="product-pricing">
        <span className="old-price">{product.oldPrice}</span>
        <div className="new-price-container">
          <div className="new-price">{product.newPrice}</div>
          {discount > 0 && (
            <span className="discount-tag">
              -{discount}%
            </span>
          )}
        </div>
        <p className="pix-info">
          no PIX
        </p>
        <p className="installments">{product.installments}</p>
      </div>

      <div className="ninja-footer">
        {product.ninja && (
          <img 
            src="https://placehold.co/100x20/003399/FFFFFF?text=PRIME+NINJA" 
            alt="Prime Ninja" 
            className="prime-ninja-logo"
          />
        )}
        <CountdownTimer compact={true} />
      </div>
    </div>
  );
}

export default NinjaProductCard;
