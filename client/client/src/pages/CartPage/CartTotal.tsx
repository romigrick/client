import React from 'react';

interface CartTotalProps {
  total: number;
  onFinalizeOrder: () => void;
}

const CartTotal: React.FC<CartTotalProps> = ({ total, onFinalizeOrder }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const shipping = total > 200 ? 0 : 29.90; // Frete grátis acima de R$ 200
  const finalTotal = total + shipping;

  const containerStyle = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
    padding: '1.5rem',
    position: 'sticky' as const,
    top: '1rem'
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '0.5rem'
  };

  const summaryStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
    marginBottom: '1.5rem'
  };

  const summaryRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const summaryLabelStyle = {
    color: '#6b7280',
    fontSize: '0.875rem'
  };

  const summaryValueStyle = {
    fontSize: '0.875rem',
    color: '#1f2937'
  };

  const totalRowStyle = {
    ...summaryRowStyle,
    borderTop: '1px solid #e5e7eb',
    paddingTop: '0.75rem',
    marginTop: '0.75rem'
  };

  const totalLabelStyle = {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#1f2937'
  };

  const totalValueStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#dc2626'
  };

  const finalizeButtonStyle = {
    width: '100%',
    backgroundColor: '#ff6600',
    color: 'white',
    fontWeight: 'bold',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem'
  };

  const freeShippingStyle = {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    textAlign: 'center' as const,
    marginTop: '1rem'
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Resumo do Pedido</h3>

      <div style={summaryStyle}>
        <div style={summaryRowStyle}>
          <span style={summaryLabelStyle}>Subtotal</span>
          <span style={summaryValueStyle}>{formatPrice(total)}</span>
        </div>

        <div style={summaryRowStyle}>
          <span style={summaryLabelStyle}>Frete</span>
          <span style={summaryValueStyle}>
            {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
          </span>
        </div>

        <div style={totalRowStyle}>
          <span style={totalLabelStyle}>Total</span>
          <span style={totalValueStyle}>{formatPrice(finalTotal)}</span>
        </div>
      </div>

      {total > 200 && (
        <div style={freeShippingStyle}>
          🎉 Parabéns! Você ganhou frete grátis!
        </div>
      )}

      <button
        style={finalizeButtonStyle}
        onClick={onFinalizeOrder}
      >
        Finalizar Pedido
      </button>
    </div>
  );
};

export default CartTotal;
