import CountdownTimer from '../CountdownTimer/index';
import type { IProduct } from '../../commons/types';

const NinjaProductCard = ({ product }: { product: IProduct }) => {
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

  // URL da imagem do produto
  const imageUrl = product.urlImagem || 'https://placehold.co/250x250/eee/333?text=Produto';

  return (
    <div className="ninja-product-card">
      <div className="ninja-product-image-container">
        <span className="ninja-coupon-tag">
          CUPOM SUPERTERCA
        </span>
        <img
          src={imageUrl}
          alt={product.name}
          className="ninja-product-image"
        />
        <span className="ninja-stock-tag">
          Restam 5 unid.
        </span>
        <span className="ninja-shipping-tag">
          <i className="pi pi-truck"></i>
          Frete grátis
        </span>
      </div>

      <p className="ninja-product-title">
        {product.name}
      </p>

      <div className="ninja-product-pricing">
        <span className="ninja-old-price">{formatPrice(product.price * 1.2)}</span>
        <div className="ninja-new-price-container">
          <div className="ninja-new-price">{formatPrice(product.price)}</div>
          {discount > 0 && (
            <span className="ninja-discount-tag">
              -{discount}%
            </span>
          )}
        </div>
        <p className="ninja-pix-info">
          no PIX
        </p>
        <p className="ninja-installments">ou 10x de {formatPrice(product.price / 10)}</p>
      </div>

      <div className="ninja-footer">
        <img
          src="https://placehold.co/100x20/003399/FFFFFF?text=PRIME+NINJA"
          alt="Prime Ninja"
          className="ninja-logo"
        />
        <CountdownTimer compact={true} />
      </div>
    </div>
  );
}

export default NinjaProductCard;
