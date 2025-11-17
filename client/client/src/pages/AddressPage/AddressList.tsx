import React from 'react';
import type { IAddress } from '../../commons/types';

interface AddressListProps {
  addresses: IAddress[];
  onEdit: (address: IAddress) => void;
  onDelete: (id: number) => void;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, onEdit, onDelete }) => {
  const listStyle = {
    display: 'grid',
    gap: '1rem'
  };

  const addressCardStyle = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const addressHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  };

  const addressTitleStyle = {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#1f2937'
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '0.5rem'
  };

  const editButtonStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    fontSize: '0.875rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer'
  };

  const deleteButtonStyle = {
    backgroundColor: '#ef4444',
    color: 'white',
    fontSize: '0.875rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer'
  };

  const addressTextStyle = {
    color: '#6b7280',
    lineHeight: '1.5'
  };

  const emptyStateStyle = {
    textAlign: 'center' as const,
    padding: '3rem 1rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb'
  };

  const emptyStateTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem'
  };

  const emptyStateTextStyle = {
    color: '#6b7280',
    marginBottom: '2rem'
  };

  if (addresses.length === 0) {
    return (
      <div style={emptyStateStyle}>
        <h3 style={emptyStateTitleStyle}>Nenhum endereço cadastrado</h3>
        <p style={emptyStateTextStyle}>
          Adicione seu primeiro endereço para continuar comprando.
        </p>
      </div>
    );
  }

  return (
    <div style={listStyle}>
      {addresses.map((address) => (
        <div key={address.id} style={addressCardStyle}>
          <div style={addressHeaderStyle}>
            <h3 style={addressTitleStyle}>
              {address.street}, {address.number}
            </h3>
            <div style={buttonGroupStyle}>
              <button
                style={editButtonStyle}
                onClick={() => onEdit(address)}
              >
                Editar
              </button>
              <button
                style={deleteButtonStyle}
                onClick={() => address.id && onDelete(address.id)}
              >
                Excluir
              </button>
            </div>
          </div>

          <div style={addressTextStyle}>
            <p>{address.city}, {address.state} - {address.zipCode}</p>
            <p>{address.country}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
