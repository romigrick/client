import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import { useAuth } from '../../context/hooks/use-auth';
import { Button } from 'primereact/button';
import './styles.css';

const AccountPage: React.FC = () => {
  const auth = useAuth() as any;
  const { authenticatedUser, handleLogout } = auth;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
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

  const contentStyle = {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '2rem'
  };

  const sidebarStyle = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const sidebarTitleStyle = {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem'
  };

  const menuItemStyle = (isActive: boolean) => ({
    display: 'block',
    padding: '0.75rem 1rem',
    marginBottom: '0.5rem',
    borderRadius: '0.375rem',
    textDecoration: 'none',
    color: isActive ? 'white' : '#374151',
    backgroundColor: isActive ? '#ff6600' : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s'
  });

  const mainContentStyle = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
    padding: '2rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1.5rem'
  };

  const formGroupStyle = {
    marginBottom: '1.5rem'
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

  const buttonStyle = {
    backgroundColor: '#ff6600',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.75rem 2rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  const logoutButtonStyle = {
    backgroundColor: '#ef4444',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.75rem 2rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '2rem'
  };

  return (
    <>
      <Header />
      <div style={containerStyle}>
        {/* Breadcrumbs */}
        <div style={breadcrumbStyle}>
          Você está em: <a href="/" style={{ color: '#ff6600', textDecoration: 'none' }}>Home</a> / Minha Conta
        </div>

        <h1 style={titleStyle}>Minha Conta</h1>

        <div style={contentStyle}>
          {/* Sidebar */}
          <div style={sidebarStyle}>
            <h2 style={sidebarTitleStyle}>Menu da Conta</h2>
            <div
              style={menuItemStyle(activeTab === 'profile')}
              onClick={() => setActiveTab('profile')}
            >
              Meus Dados
            </div>
            <div
              style={menuItemStyle(activeTab === 'orders')}
              onClick={() => setActiveTab('orders')}
            >
              Meus Pedidos
            </div>
            <div
              style={menuItemStyle(activeTab === 'addresses')}
              onClick={() => setActiveTab('addresses')}
            >
              Endereços
            </div>
            <button
              style={logoutButtonStyle}
              onClick={handleLogoutClick}
            >
              Sair
            </button>
          </div>

          {/* Main Content */}
          <div style={mainContentStyle}>
            {activeTab === 'profile' && (
              <div>
                <h2 style={sectionTitleStyle}>Meus Dados</h2>
                <form>
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Nome Completo</label>
                    <input
                      type="text"
                      style={inputStyle}
                      value={authenticatedUser?.displayName || ''}
                      readOnly
                    />
                  </div>
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Nome de Usuário</label>
                    <input
                      type="text"
                      style={inputStyle}
                      value={authenticatedUser?.username || ''}
                      readOnly
                    />
                  </div>
                  <button type="button" style={buttonStyle}>
                    Editar Perfil
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 style={sectionTitleStyle}>Meus Pedidos</h2>
                <div className="flex justify-between items-center mb-4">
                  <p>Histórico de pedidos será exibido aqui.</p>
                  <Button
                    label="Ver Todos os Pedidos"
                    icon="pi pi-list"
                    onClick={() => navigate('/orders')}
                    className="p-button-outlined"
                  />
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h2 style={sectionTitleStyle}>Endereços</h2>
                <p>Gerencie seus endereços de entrega.</p>
                <button
                  style={buttonStyle}
                  onClick={() => navigate('/addresses')}
                >
                  Gerenciar Endereços
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountPage;
