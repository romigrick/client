

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

  return (
    <div className="ninja-product-card">
      <div className="ninja-product-image-container">
        {product.coupon && (
          <span className="ninja-coupon-tag">
            {product.coupon}
          </span>
        )}
        <img
          src={product.imgSrc}
          alt={product.title}
          className="ninja-product-image"
        />
        {product.restam && product.restam > 0 && (
          <span className="ninja-stock-tag">
            Restam {product.restam} unid.
          </span>
        )}
        {product.freeShipping && (
          <span className="ninja-shipping-tag">
            <i className="pi pi-truck"></i>
            Frete grátis
          </span>
        )}
      </div>

      <p className="ninja-product-title">
        {product.title}
      </p>

      <div className="ninja-product-pricing">
        <span className="ninja-old-price">{product.oldPrice}</span>
        <div className="ninja-new-price-container">
          <div className="ninja-new-price">{product.newPrice}</div>
          {discount > 0 && (
            <span className="ninja-discount-tag">
              -{discount}%
            </span>
          )}
        </div>
        <p className="ninja-pix-info">
          no PIX
        </p>
        <p className="ninja-installments">{product.installments}</p>
      </div>

      <div className="ninja-footer">
        {product.ninja && (
          <img
            src="https://placehold.co/100x20/003399/FFFFFF?text=PRIME+NINJA"
            alt="Prime Ninja"
            className="ninja-logo"
          />
        )}
        <CountdownTimer compact={true} />
      </div>
    </div>
  );
}

export default NinjaProductCard;
