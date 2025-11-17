import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import AddressService from '../../services/addressService';
import type { IAddress } from '../../commons/types';
import AddressForm from './AddressForm';
import AddressList from './AddressList';
import './styles.css';

const AddressPage = () => {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<IAddress | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const response = await AddressService.getUserAddresses();
      if (response.success && response.data) {
        setAddresses(response.data as IAddress[]);
      }
    } catch (error) {
      console.error('Erro ao carregar endereços:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAddress = async (addressData: Omit<IAddress, 'id'>) => {
    try {
      const response = await AddressService.createAddress(addressData);
      if (response.success) {
        alert('Endereço criado com sucesso!');
        setShowForm(false);
        loadAddresses();
      } else {
        alert('Erro ao criar endereço: ' + response.message);
      }
    } catch (error) {
      console.error('Erro ao criar endereço:', error);
      alert('Erro ao criar endereço. Tente novamente.');
    }
  };

  const handleUpdateAddress = async (id: number, addressData: Omit<IAddress, 'id'>) => {
    try {
      const response = await AddressService.updateAddress(id, addressData);
      if (response.success) {
        alert('Endereço atualizado com sucesso!');
        setShowForm(false);
        setEditingAddress(null);
        loadAddresses();
      } else {
        alert('Erro ao atualizar endereço: ' + response.message);
      }
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error);
      alert('Erro ao atualizar endereço. Tente novamente.');
    }
  };

  const handleDeleteAddress = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este endereço?')) {
      return;
    }

    try {
      const response = await AddressService.deleteAddress(id);
      if (response.success) {
        alert('Endereço excluído com sucesso!');
        loadAddresses();
      } else {
        alert('Erro ao excluir endereço: ' + response.message);
      }
    } catch (error) {
      console.error('Erro ao excluir endereço:', error);
      alert('Erro ao excluir endereço. Tente novamente.');
    }
  };

  const handleEditAddress = (address: IAddress) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingAddress(null);
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

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  };

  const addButtonStyle = {
    backgroundColor: '#ff6600',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.75rem 2rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  if (loading) {
    return (
      <>
        <Header />
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            Carregando endereços...
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={containerStyle}>
        {/* Breadcrumbs */}
        <div style={breadcrumbStyle}>
          Você está em: <a href="/" style={{ color: '#ff6600', textDecoration: 'none' }}>Home</a> / Endereços
        </div>

        <div style={headerStyle}>
          <h1 style={titleStyle}>Meus Endereços</h1>
          <button
            style={addButtonStyle}
            onClick={() => setShowForm(true)}
          >
            Adicionar Endereço
          </button>
        </div>

        {showForm && (
          <AddressForm
            address={editingAddress}
            onSubmit={editingAddress ? handleUpdateAddress : handleCreateAddress}
            onCancel={handleCancelForm}
          />
        )}

        <AddressList
          addresses={addresses}
          onEdit={handleEditAddress}
          onDelete={handleDeleteAddress}
        />
      </div>
      <Footer />
    </>
  );
};

export default AddressPage;
