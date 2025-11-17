import React from 'react';
import { useCart } from '../../context/CartContext';
import type { ICartItem } from '../../commons/types';

interface CartItemProps {
  item: ICartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.product.id!, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.product.id!);
  };

  const itemStyle = {
    display: 'flex',
    gap: '1rem',
    padding: '1rem 0',
    borderBottom: '1px solid #e5e7eb'
  };

  const imageStyle = {
    width: '80px',
    height: '80px',
    objectFit: 'contain' as const,
    borderRadius: '0.375rem',
    border: '1px solid #e5e7eb'
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem'
  };

  const titleStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#1f2937',
    lineHeight: '1.4'
  };

  const priceStyle = {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#dc2626'
  };

  const controlsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '0.5rem'
  };

  const quantityControlsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const quantityButtonStyle = {
    width: '32px',
    height: '32px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    color: '#374151',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem'
  };

  const quantityInputStyle = {
    width: '60px',
    height: '32px',
    border: '1px solid #d1d5db',
    borderRadius: '0.25rem',
    textAlign: 'center' as const,
    fontSize: '0.875rem'
  };

  const removeButtonStyle = {
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '0.875rem'
  };

  const subtotalStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: '0.5rem'
  };

  return (
    <div style={itemStyle}>
      <img
        src={item.product.urlImagem || 'https://placehold.co/80x80/eee/333?text=Produto'}
        alt={item.product.name}
        style={imageStyle}
      />

      <div style={contentStyle}>
        <h3 style={titleStyle}>{item.product.name}</h3>
        <div style={priceStyle}>{formatPrice(item.product.price)}</div>

        <div style={controlsStyle}>
          <div style={quantityControlsStyle}>
            <button
              style={quantityButtonStyle}
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              style={quantityInputStyle}
            />
            <button
              style={quantityButtonStyle}
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            style={removeButtonStyle}
            onClick={handleRemove}
          >
            Remover
          </button>
        </div>

        <div style={subtotalStyle}>
          Subtotal: {formatPrice(item.product.price * item.quantity)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
