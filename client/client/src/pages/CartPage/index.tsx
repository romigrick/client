import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import { useCart } from '../../context/CartContext';
import OrderService from '../../services/orderService';
import type { IOrder } from '../../commons/types';
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import './styles.css';

const CartPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleFinalizeOrder = async () => {
    if (items.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    const order: IOrder = {
      items: items,
      total: getTotalPrice(),
    };

    try {
      const response = await OrderService.createOrder(order);
      if (response.success) {
        alert('Pedido realizado com sucesso!');
        clearCart();
        navigate('/');
      } else {
        alert('Erro ao finalizar pedido: ' + response.message);
      }
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      alert('Erro ao finalizar pedido. Tente novamente.');
    }
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem',
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
  };

  const breadcrumbStyle = {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginBottom: '1rem'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1.5rem'
  };

  const emptyCartStyle = {
    textAlign: 'center' as const,
    padding: '3rem 1rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb'
  };

  const emptyCartTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem'
  };

  const emptyCartTextStyle = {
    color: '#6b7280',
    marginBottom: '2rem'
  };

  const emptyCartButtonStyle = {
    backgroundColor: '#ff6600',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.75rem 2rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  const cartContentStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '2rem'
  };

  const cartItemsStyle = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
    padding: '1.5rem'
  };

  const cartItemsTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '0.5rem'
  };

  return (
    <>
      <Header />
      <div style={containerStyle}>
        {/* Breadcrumbs */}
        <div style={breadcrumbStyle}>
          Você está em: <a href="/" style={{ color: '#ff6600', textDecoration: 'none' }}>Home</a> / Carrinho
        </div>

        <h1 style={titleStyle}>Carrinho de Compras</h1>

        {items.length === 0 ? (
          <div style={emptyCartStyle}>
            <h2 style={emptyCartTitleStyle}>Seu carrinho está vazio</h2>
            <p style={emptyCartTextStyle}>
              Adicione produtos ao seu carrinho para continuar comprando.
            </p>
            <button
              style={emptyCartButtonStyle}
              onClick={() => navigate('/products')}
            >
              Continuar Comprando
            </button>
          </div>
        ) : (
          <div style={cartContentStyle}>
            {/* Itens do Carrinho */}
            <div style={cartItemsStyle}>
              <h2 style={cartItemsTitleStyle}>
                Itens no Carrinho ({items.length})
              </h2>
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            {/* Resumo e Total */}
            <CartTotal
              total={getTotalPrice()}
              onFinalizeOrder={handleFinalizeOrder}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
