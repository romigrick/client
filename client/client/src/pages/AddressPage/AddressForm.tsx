import React, { useState, useEffect } from 'react';
import type { IAddress } from '../../commons/types';

interface AddressFormProps {
  address?: IAddress | null;
  onSubmit: (addressData: Omit<IAddress, 'id'>) => void;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<IAddress, 'id'>>({
    street: '',
    number: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Brasil'
  });

  useEffect(() => {
    if (address) {
      setFormData({
        street: address.street,
        number: address.number,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country
      });
    }
  }, [address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formStyle = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1.5rem'
  };

  const formGroupStyle = {
    marginBottom: '1rem'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    backgroundColor: 'white'
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem'
  };

  const submitButtonStyle = {
    backgroundColor: '#ff6600',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.75rem 2rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  const cancelButtonStyle = {
    backgroundColor: '#6b7280',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.75rem 2rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2 style={titleStyle}>
        {address ? 'Editar Endereço' : 'Novo Endereço'}
      </h2>

      <div style={gridStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Rua *</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Número *</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Cidade *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Estado *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>CEP *</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>País *</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
      </div>

      <div style={buttonGroupStyle}>
        <button type="submit" style={submitButtonStyle}>
          {address ? 'Atualizar' : 'Salvar'}
        </button>
        <button type="button" style={cancelButtonStyle} onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
