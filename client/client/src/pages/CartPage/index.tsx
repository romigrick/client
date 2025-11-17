import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import { useCart } from '../../context/CartContext';
import OrderService from '../../services/orderService';
import AddressService from '../../services/addressService';
import type { IOrder, IOrderItem, IAddress } from '../../commons/types';
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import './styles.css';

const CartPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

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

    // Check if user has addresses
    try {
      const addressResponse = await AddressService.getUserAddresses();
      if (!addressResponse.success || !addressResponse.data || addressResponse.data.length === 0) {
        alert('Você precisa cadastrar um endereço antes de finalizar o pedido.');
        navigate('/addresses');
        return;
      }

      // Show address selection dialog
      setAddresses(addressResponse.data);
      setSelectedAddressId(addressResponse.data[0].id!);
      setShowAddressDialog(true);
    } catch (error) {
      console.error('Erro ao carregar endereços:', error);
      alert('Erro ao carregar endereços. Tente novamente.');
    }
  };

  const handleConfirmOrder = async () => {
    if (!selectedAddressId) {
      alert('Selecione um endereço para entrega.');
      return;
    }

    try {
      const order: IOrder = {
        address: { id: selectedAddressId },
        items: items.map(item => ({
          product: { id: item.product.id! },
          quantity: item.quantity
        })) as IOrderItem[],
      };

      const response = await OrderService.createOrder(order);
      if (response.success) {
        alert('Pedido realizado com sucesso!');
        clearCart();
        setShowAddressDialog(false);
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

  const addressDialogFooter = (
    <div>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => setShowAddressDialog(false)}
        className="p-button-text"
      />
      <Button
        label="Confirmar Pedido"
        icon="pi pi-check"
        onClick={handleConfirmOrder}
        autoFocus
      />
    </div>
  );

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

      {/* Address Selection Dialog */}
      <Dialog
        header="Selecione o endereço de entrega"
        visible={showAddressDialog}
        style={{ width: '50vw' }}
        footer={addressDialogFooter}
        onHide={() => setShowAddressDialog(false)}
      >
        <div className="p-fluid">
          {addresses.map((address) => (
            <div key={address.id} className="field-radiobutton mb-3">
              <RadioButton
                inputId={`address-${address.id}`}
                name="address"
                value={address.id}
                onChange={(e) => setSelectedAddressId(e.value)}
                checked={selectedAddressId === address.id}
              />
              <label htmlFor={`address-${address.id}`} className="ml-2">
                <div className="font-medium">
                  {address.street}, {address.number} - {address.city}, {address.state}
                </div>
                <div className="text-sm text-gray-600">
                  CEP: {address.zipCode}
                </div>
              </label>
            </div>
          ))}
        </div>
      </Dialog>

      <Footer />
    </>
  );
};

export default CartPage;
