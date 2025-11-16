import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/hooks/use-auth';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import CategoryService from '../../services/categoryService';
import type { ICategory } from '../../commons/types';
import logoImage from '@/assets/katchau_logo.png';

// Styles migrated from index.css
const headerStyle: React.CSSProperties = {
  backgroundColor: '#003399',
  color: 'white',
  position: 'sticky',
  top: 0,
  zIndex: 50,
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
};

const headerContainerStyle = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 1rem'
};

const headerContentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '5rem'
};

const headerLeftStyle = {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0
};

const mobileMenuButtonStyle = {
  marginRight: '0.75rem',
  padding: '0.5rem',
  borderRadius: '0.375rem',
  background: 'none',
  border: 'none',
  color: 'white',
  cursor: 'pointer'
};

const mobileMenuButtonHoverStyle = {
  ...mobileMenuButtonStyle,
  backgroundColor: '#0044cc'
};

const logoImageStyle = {
  height: '60px',
  width: 'auto'
};

const sendToDesktopStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
  minWidth: '110px'
};

const searchBarWrapperStyle: React.CSSProperties = {
  display: 'flex',
  width: '100%'
};

const searchInputStyle: React.CSSProperties = {
  width: '100%',
  flexGrow: 1,
  height: '3rem',
  borderRadius: '0.5rem 0 0 0.5rem',
  paddingLeft: '1.25rem',
  color: '#1f2937',
  border: 'none',
  boxSizing: 'border-box',
  backgroundColor: '#ffffff'
};

const searchButtonStyle: React.CSSProperties = {
  height: '3rem',
  width: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f97316',
  borderRadius: '0 0.5rem 0.5rem 0',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  flexShrink: 0,
  boxSizing: 'border-box'
};

const loginDesktopStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: '0.375rem',
  textDecoration: 'none',
  color: 'white'
};

const loginDesktopHoverStyle = {
  ...loginDesktopStyle,
  backgroundColor: '#0044cc'
};

const actionsDesktopStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
};

const actionIconStyle = {
  padding: '0.5rem',
  borderRadius: '9999px',
  color: 'white',
  textDecoration: 'none'
};

const cartIconStyle = {
  ...actionIconStyle,
  color: '#f97316'
};

const navbarDesktopStyle = {
  backgroundColor: '#00287D',
  display: 'none'
};

const navbarContainerStyle = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 1rem',
  display: 'flex',
  alignItems: 'center',
  height: '2.5rem',
  gap: '1.5rem'
};

const offerLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0 1rem',
  backgroundColor: '#f97316',
  borderRadius: '0.375rem',
  fontWeight: 700,
  fontSize: '0.875rem',
  height: '100%',
  color: 'white',
  textDecoration: 'none'
};

const navLinkStyle = {
  fontSize: '0.875rem',
  fontWeight: 700,
  color: 'white',
  textDecoration: 'none'
};

const navLinkHoverStyle = {
  ...navLinkStyle,
  color: '#f97316'
};

const mobileMenuOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 50,
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease-in-out'
};

const mobileMenuOverlayActiveStyle = {
  ...mobileMenuOverlayStyle,
  opacity: 1,
  pointerEvents: 'auto'
};

const mobileMenuContentStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '80%',
  maxWidth: '24rem',
  backgroundColor: 'white',
  color: 'black',
  padding: '1.5rem',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  transform: 'translateX(-100%)',
  transition: 'transform 0.3s ease-in-out'
};

const mobileMenuContentActiveStyle = {
  ...mobileMenuContentStyle,
  transform: 'translateX(0)'
};

const mobileMenuHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem'
};

const mobileLoginStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const closeButtonStyle = {
  padding: '0.5rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer'
};

const mobileSendToStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '1.5rem',
  padding: '0.5rem',
  borderRadius: '0.375rem',
  cursor: 'pointer'
};

const mobileSendToHoverStyle = {
  ...mobileSendToStyle,
  backgroundColor: '#f3f4f6'
};

const mobileNavStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const mobileNavLinkStyle = {
  fontWeight: 700,
  fontSize: '1.125rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textDecoration: 'none',
  color: '#1f2937'
};

const mobileNavLinkOfferStyle = {
  ...mobileNavLinkStyle,
  color: '#f97316'
};

  const mobileActionsStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '1.5rem',
    left: '1.5rem',
    display: 'flex',
    gap: '1rem'
  };

const mobileActionIconStyle = {
  padding: '0.5rem',
  borderRadius: '9999px',
  color: '#1f2937'
};

const mobileActionIconHoverStyle = {
  ...mobileActionIconStyle,
  backgroundColor: '#e5e7eb'
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { authenticated, authenticatedUser, handleLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAllCategories();
        if (response.success && response.data) {
          setCategories(response.data as ICategory[]);
        }
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const items: MenuItem[] = authenticated
    ? [
        { label: "Home", icon: "pi pi-home", command: () => navigate("/") },
        {
          label: "Categorias",
          icon: "pi pi-box",
          items: [
            {
              label: "Listar",
              icon: "pi pi-list",
              command: () => navigate("/categories"),
            },
            {
              label: "Novo",
              icon: "pi pi-plus",
              command: () => navigate("/categories/new"),
            },
          ],
        },
        {
          label: "Produtos",
          icon: "pi pi-box",
          items: [
            {
              label: "Listar",
              icon: "pi pi-list",
              command: () => navigate("/products"),
            },
            {
              label: "Novo",
              icon: "pi pi-plus",
              command: () => navigate("/products/new"),
            },
          ],
        },
        { label: "Prod. Show", icon: "pi pi-search", command: () => navigate("/products/show") },
      ]
    : [];

  const AuthDisplay = () => {
    if (authenticated) {
      return (
        <div className="flex align-items-center gap-2 cursor-pointer p-2 border-round-md text-white hover:bg-blue-800">
          <span style={{marginRight: '1rem'}}>Olá, {authenticatedUser?.displayName}</span>
          <button onClick={() => { handleLogout(); }} className="p-button p-button-sm p-button-danger">Sair</button>
        </div>
      );
    } else {
      return (
        <Link to="/login" className="flex align-items-center gap-2 cursor-pointer p-2 border-round-md no-underline text-white hover:bg-blue-800">
          <i className="pi pi-user" />
          <div className="text-xs">
            <div>Entre ou</div>
            <div className="font-bold">Cadastre-se</div>
          </div>
        </Link>
      );
    }
  };

  return (
    <header style={headerStyle}>
      <div style={headerContainerStyle}>
        <div style={headerContentStyle}>
          <div style={headerLeftStyle}>
            <button
              onClick={() => setMobileMenuOpen(true)}
              style={mobileMenuButtonStyle}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0044cc'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'none'}
              className="lg:hidden"
            >
              <i className="pi pi-bars" />
            </button>
            <Link to="/">
              <img src={logoImage} alt="Katchau Logo" style={logoImageStyle} />
            </Link>
          </div>

          <div className="hidden lg:flex align-items-center gap-4 flex-grow-1 min-w-0 mx-6">
            <div style={sendToDesktopStyle}>
              <i className="pi pi-map-marker" />
              <div className="text-xs">
                <div>Enviar para</div>
                <div className="font-bold">Digite o CEP</div>
              </div>
            </div>
            <div style={searchBarWrapperStyle}>
              <input
                type="text"
                placeholder="Busque no Katchau!"
                style={searchInputStyle}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button style={searchButtonStyle} onClick={handleSearch}><i className="pi pi-search" /></button>
            </div>
          </div>

          <div className="hidden lg:flex align-items-center gap-6">
            <div style={actionsDesktopStyle}>
              <a href="#" style={actionIconStyle}><i className="pi pi-star" /></a>
              <a href="#" style={actionIconStyle}><i className="pi pi-bell" /></a>
              <a href="#" style={actionIconStyle}><i className="pi pi-heart" /></a>
              <a href="#" style={cartIconStyle}><i className="pi pi-shopping-cart" /></a>
            </div>
            <AuthDisplay />
          </div>

          <div className="block lg:hidden">
            <a href="#" style={cartIconStyle}><i className="pi pi-shopping-cart" /></a>
          </div>
        </div>
      </div>

      <nav style={navbarDesktopStyle} className="hidden lg:block">
        <div style={navbarContainerStyle}>
          <Link to={`/products`} style={offerLinkStyle} onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
            <i className="pi pi-tag" />
            <span>TODOS</span>
            <i className="pi pi-chevron-down" />
          </Link>
          {categories.map(category => (
            <Link to={`/products?category=${category.name}`} key={category.id} style={navLinkStyle} onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>{category.name}</Link>
          ))}
        </div>
      </nav>

      <div style={mobileMenuOpen ? mobileMenuOverlayActiveStyle : mobileMenuOverlayStyle} onClick={() => setMobileMenuOpen(false)}>
        <div
          style={mobileMenuOpen ? mobileMenuContentActiveStyle : mobileMenuContentStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={mobileMenuHeaderStyle}>
            {authenticated ? (
              <div style={mobileLoginStyle}>
                <i className="pi pi-user text-orange-500 text-3xl" />
                <div className="text-xs">
                  <div>Olá,</div>
                  <div className="font-bold">{authenticatedUser?.displayName}</div>
                </div>
              </div>
            ) : (
              <Link to="/login" style={mobileLoginStyle} onClick={() => setMobileMenuOpen(false)}>
                <i className="pi pi-user text-orange-500 text-3xl" />
                <div className="text-xs">
                  <div>Entre ou</div>
                  <div className="font-bold">Cadastre-se</div>
                </div>
              </Link>
            )}
            <button onClick={() => setMobileMenuOpen(false)} style={closeButtonStyle}>
              <i className="pi pi-times" />
            </button>
          </div>

          <div style={mobileSendToStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <i className="pi pi-map-marker text-orange-500 text-2xl" />
            <div className="text-xs">
              <div>Enviar para</div>
              <div className="font-bold">Digite o CEP</div>
            </div>
          </div>

          <nav style={mobileNavStyle}>
            <Link to={`/products`} style={mobileNavLinkOfferStyle} onClick={() => setMobileMenuOpen(false)}><span>TODOS</span><i className="pi pi-chevron-right" /></Link>
            {categories.map(category => (
              <Link to={`/products?category=${category.name}`} key={category.id} style={mobileNavLinkStyle} onClick={() => setMobileMenuOpen(false)}><span>{category.name}</span><i className="pi pi-chevron-right" /></Link>
            ))}
          </nav>

          <div style={mobileActionsStyle}>
            <a href="#" style={mobileActionIconStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}><i className="pi pi-bell" /></a>
            <a href="#" style={mobileActionIconStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}><i className="pi pi-heart" /></a>
            {authenticated && (
              <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); setMobileMenuOpen(false); }} style={mobileActionIconStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <i className="pi pi-sign-out" />
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
