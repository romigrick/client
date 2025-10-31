import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

// --- Interfaces de Tipos ---

interface ListingProduct {
  id: number;
  imgSrc: string;
  title: string;
  rating: number;
  reviewCount: number;
  oldPrice: string | null;
  newPrice: string;
  installments: string;
  freeShipping: boolean;
  prime: boolean;
}

interface FilterOption {
  label: string;
  count: number;
  checked: boolean;
}

interface FilterGroup {
  id: string;
  title: string;
  open: boolean;
  options: FilterOption[];
}

interface FilterSidebarProps {
  filters: FilterGroup[];
  onFilterChange: (groupId: string, optionLabel: string) => void;
  onToggleGroup: (groupId: string) => void;
}

interface ListingProductCardProps {
  product: ListingProduct;
}

// --- Dados Mockados ---

const listingProducts: ListingProduct[] = [
  {
    id: 1,
    imgSrc: 'https://placehold.co/150x150/eee/333?text=Fonte+MSI',
    title: 'Fonte MSI MAG A650BN, 650W, 80 Plus Bronze, PFC Ativo, Com Cabo, Preto - 306-7ZP2B22-CE0',
    rating: 5,
    reviewCount: 980,
    oldPrice: 'R$ 319,99',
    newPrice: 'R$ 219,99',
    installments: 'ou 10x de R$ 23,64',
    freeShipping: false,
    prime: true,
  },
  {
    id: 2,
    imgSrc: 'https://placehold.co/150x150/eee/333?text=RAM+Kingston',
    title: 'Memória RAM Kingston Fury Beast, 16GB, 3200MHz, DDR4, CL16, Preto - KF432C16BB1/16',
    rating: 5,
    reviewCount: 980,
    oldPrice: null,
    newPrice: 'R$ 399,99',
    installments: 'ou 10x de R$ 39,99',
    freeShipping: false,
    prime: false,
  },
  {
    id: 3,
    imgSrc: 'https://placehold.co/150x150/eee/333?text=SSD+Kingston',
    title: 'SSD Kingston NV2 1TB, M.2 2280, PCIe 4.0 x4, NVMe, Leitura: 3500 MB/s, Gravação: 2100 MB/s - SNV2S/1000G',
    rating: 5,
    reviewCount: 980,
    oldPrice: null,
    newPrice: 'R$ 399,99',
    installments: 'ou 10x de R$ 46,66',
    freeShipping: true,
    prime: false,
  },
  {
    id: 4,
    imgSrc: 'https://placehold.co/150x150/eee/333?text=RAM+Kingston',
    title: 'Memória RAM Kingston Fury Beast, 8GB, 3200MHz, DDR4, CL16, Preto - KF432C16BB/8',
    rating: 5,
    reviewCount: 980,
    oldPrice: null,
    newPrice: 'R$ 137,99',
    installments: 'ou 10x de R$ 27,19',
    freeShipping: false,
    prime: false,
  },
  {
    id: 5,
    imgSrc: 'https://placehold.co/150x150/eee/333?text=RAM+Kingston',
    title: 'Memória RAM Kingston Fury Beast, 8GB, 3200MHz, DDR4, CL16, Preto - KF432C16BB/8',
    rating: 5,
    reviewCount: 980,
    oldPrice: null,
    newPrice: 'R$ 219,99',
    installments: 'ou 10x de R$ 23,39',
    freeShipping: false,
    prime: false,
  },
];

const mockFilters: FilterGroup[] = [
  {
    id: 'vendidoPor',
    title: 'Vendido por',
    open: true,
    options: [
      { label: 'KaBuM!', count: 8393, checked: false },
    ]
  },
  {
    id: 'oferta',
    title: 'TOP OFERTA',
    open: true,
    options: [
      { label: 'Ofertas do Dia', count: 18, checked: false },
      { label: 'CUPOM KABEOFF', count: 6, checked: false },
      { label: 'CUPOM KORILIAO', count: 12, checked: false },
      { label: 'CUPOM AIYIMILIA', count: 2, checked: false },
    ]
  },
  {
    id: 'beneficios',
    title: 'Benefícios',
    open: true,
    options: [
      { label: 'Frete grátis', count: 341, checked: false },
      { label: 'OpenBox', count: 18, checked: false },
      { label: 'Prime Ninja', count: 5041, checked: false },
    ]
  }
];

// --- Componente: Barra Lateral de Filtros ---
function FilterSidebar({ filters, onFilterChange, onToggleGroup }: FilterSidebarProps) {
  const sidebarStyle = {
    width: '100%',
    paddingRight: '1rem'
  };

  const breadcrumbStyle = {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '1rem'
  };

  const breadcrumbLinkStyle = {
    color: '#ff6600',
    textDecoration: 'none'
  };

  const categoryTitleStyle = {
    fontWeight: 'bold',
    color: '#1f2937',
    fontSize: '1.125rem',
    marginBottom: '0.5rem'
  };

  const navStyle = {
    fontSize: '0.875rem',
    color: '#374151',
    marginBottom: '1rem'
  };

  const navLinkStyle = {
    display: 'block',
    color: '#374151',
    textDecoration: 'none',
    marginBottom: '0.25rem'
  };

  const filterGroupStyle = {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '1rem',
    paddingBottom: '1rem'
  };

  const groupButtonStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    textAlign: 'left' as const,
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  };

  const groupTitleStyle = {
    fontWeight: 'bold',
    color: '#1f2937'
  };

  const chevronStyle = (open: boolean) => ({
    transition: 'transform 0.2s',
    transform: open ? 'rotate(0deg)' : 'rotate(180deg)'
  });

  const optionsStyle = {
    marginTop: '0.75rem'
  };

  const optionLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    color: '#374151',
    cursor: 'pointer',
    marginBottom: '0.5rem'
  };

  const checkboxStyle = {
    marginRight: '0.5rem'
  };

  const countStyle = {
    color: '#6b7280',
    fontSize: '0.75rem',
    marginLeft: 'auto'
  };

  return (
    <aside style={sidebarStyle}>
      <div style={breadcrumbStyle}>
        <a href="#" style={breadcrumbLinkStyle}>Hardware</a> / <a href="#" style={breadcrumbLinkStyle}>SSD</a> / <span style={{ fontWeight: 'bold' }}>SSD M.2</span>
      </div>

      <h3 style={categoryTitleStyle}>Categorias relacionadas</h3>
      <nav style={navStyle}>
        <a href="#" style={navLinkStyle}>Hardware</a>
        <a href="#" style={{ ...navLinkStyle, fontWeight: 'bold', marginLeft: '0.5rem' }}>SSD</a>
        <a href="#" style={{ ...navLinkStyle, marginLeft: '1rem' }}>SSD 2.5"</a>
        <a href="#" style={{ ...navLinkStyle, fontWeight: 'bold', marginLeft: '1rem' }}>SSD M.2</a>
        <a href="#" style={{ ...navLinkStyle, marginLeft: '1rem' }}>SSD Externo</a>
        <a href="#" style={navLinkStyle}>PC Hardware</a>
        <a href="#" style={{ ...breadcrumbLinkStyle, fontSize: '0.75rem' }}>Ver mais</a>
      </nav>

      {filters.map(group => (
        <div key={group.id} style={filterGroupStyle}>
          <button
            style={groupButtonStyle}
            onClick={() => onToggleGroup(group.id)}
          >
            <h4 style={groupTitleStyle}>{group.title}</h4>
            <i className="pi pi-chevron-up" style={chevronStyle(group.open)} />
          </button>
          {group.open && (
            <div style={optionsStyle}>
              {group.options.map(option => (
                <label key={option.label} style={optionLabelStyle}>
                  <Checkbox
                    checked={option.checked}
                    onChange={() => onFilterChange(group.id, option.label)}
                    style={checkboxStyle}
                  />
                  <span style={{ flex: 1 }}>{option.label}</span>
                  <span style={countStyle}>{option.count}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}

// --- Componente: Card de Produto da Listagem ---
function ListingProductCard({ product }: ListingProductCardProps) {
  const cardStyle = {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    transition: 'box-shadow 0.2s'
  };

  const imageStyle = {
    width: '100%',
    height: '9rem',
    objectFit: 'contain' as const,
    marginBottom: '0.5rem',
    alignSelf: 'center'
  };

  const starsContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '1.25rem'
  };

  const starStyle = (filled: boolean) => ({
    width: '0.75rem',
    height: '0.75rem',
    color: filled ? '#fb923c' : '#d1d5db'
  });

  const reviewCountStyle = {
    marginLeft: '0.25rem',
    fontSize: '0.75rem',
    color: '#6b7280'
  };

  const titleStyle = {
    fontSize: '0.875rem',
    color: '#374151',
    height: '5rem',
    overflow: 'hidden',
    marginTop: '0.5rem',
    marginBottom: '0.5rem'
  };

  const pricingStyle = {
    marginTop: 'auto'
  };

  const oldPriceStyle = {
    fontSize: '0.75rem',
    color: '#6b7280',
    textDecoration: 'line-through'
  };

  const newPriceStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#dc2626'
  };

  const pixInfoStyle = {
    fontSize: '0.75rem',
    color: '#059669'
  };

  const installmentsStyle = {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '0.25rem'
  };

  const primeStyle = {
    height: '1rem',
    marginTop: '0.25rem',
    marginBottom: '0.25rem'
  };

  const shippingStyle = {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: '#16a34a',
    display: 'flex',
    alignItems: 'center'
  };

  const buttonStyle = {
    marginTop: '1rem',
    width: '100%',
    backgroundColor: '#ff6600',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer'
  };

  const renderStars = (rating: number, reviewCount: number) => {
    let stars: React.ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className="pi pi-star-fill"
          style={starStyle(i <= rating)}
        />
      );
    }
    stars.push(<span key="count" style={reviewCountStyle}>({reviewCount})</span>);
    return <div style={starsContainerStyle}>{stars}</div>;
  };

  return (
    <div style={cardStyle}>
      <img
        src={product.imgSrc}
        alt={product.title}
        style={imageStyle}
      />
      {renderStars(product.rating, product.reviewCount)}
      <p style={titleStyle}>
        {product.title}
      </p>

      <div style={pricingStyle}>
        {product.oldPrice && (
          <span style={oldPriceStyle}>{product.oldPrice}</span>
        )}
        <div style={newPriceStyle}>
          {product.newPrice}
        </div>
        <p style={pixInfoStyle}>à vista no PIX</p>
        <p style={installmentsStyle}>{product.installments}</p>

        {product.prime && (
          <img
            src="https://placehold.co/100x20/003399/FFFFFF?text=PRIME+NINJA"
            alt="Prime Ninja"
            style={primeStyle}
          />
        )}
        {product.freeShipping && (
          <span style={shippingStyle}>
            <i className="pi pi-truck" style={{ marginRight: '0.25rem' }} />
            Frete grátis
          </span>
        )}

        <button style={buttonStyle}>
          COMPRAR
        </button>
      </div>
    </div>
  );
}

// --- Componente Principal da Página ---
export default function ProductListingPage() {
  const [filters, setFilters] = useState<FilterGroup[]>(mockFilters);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleFilterChange = (groupId: string, optionLabel: string) => {
    setFilters(prevFilters =>
      prevFilters.map(group =>
        group.id === groupId ? {
          ...group,
          options: group.options.map(option =>
            option.label === optionLabel ? { ...option, checked: !option.checked } : option
          )
        } : group
      )
    );
  };

  const handleToggleGroup = (groupId: string) => {
    setFilters(prevFilters =>
      prevFilters.map(group =>
        group.id === groupId ? { ...group, open: !group.open } : group
      )
    );
  };

  const categories: string[] = [
    "TODOS", "COOLERS", "DISCO RÍGIDO (HD)", "DRIVES", "FONTES", "KIT HARDWARE", "MEMÓRIA RAM", "PLACA DE VÍDEO (VGA)", "PLACAS INTERFACE"
  ];
  const [activeTab, setActiveTab] = useState<string>("TODOS");

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem',
    marginTop: '1.5rem',
    marginBottom: '1.5rem'
  };

  const breadcrumbStyle = {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginBottom: '1rem'
  };

  const bannerStyle = {
    width: '100%',
    backgroundColor: '#581c87',
    color: 'white',
    borderRadius: '0.5rem',
    marginBottom: '1.5rem',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const bannerTextStyle = {
    flex: 1
  };

  const bannerImageStyle = {
    height: '12rem'
  };

  const bannerButtonStyle = {
    backgroundColor: 'white',
    color: '#581c87',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    textDecoration: 'none'
  };

  const offerBarStyle = {
    backgroundColor: '#ff6600',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontSize: '1.125rem',
    marginBottom: '1.5rem'
  };

  const mainContentStyle = {
    display: 'flex',
    flexDirection: 'row' as const
  };

  const sidebarStyle = {
    width: '25%',
    paddingRight: '1rem'
  };

  const mainStyle = {
    width: '75%'
  };

  const controlsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb'
  };

  const controlsLeftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const labelStyle = {
    fontSize: '0.875rem'
  };

  const selectStyle = {
    marginLeft: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    padding: '0.5rem',
    fontSize: '0.875rem'
  };

  const controlsRightStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem'
  };

  const viewButtonStyle = (active: boolean) => ({
    padding: '0.5rem',
    borderRadius: '0.375rem',
    backgroundColor: active ? '#fed7aa' : 'transparent',
    color: active ? '#ff6600' : '#6b7280',
    border: 'none',
    cursor: 'pointer'
  });

  const tabsStyle = {
    marginBottom: '1rem',
    overflowX: 'auto' as const
  };

  const tabsContainerStyle = {
    display: 'flex',
    gap: '0.5rem',
    paddingBottom: '0.5rem'
  };

  const tabTitleStyle = {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginRight: '0.5rem',
    whiteSpace: 'nowrap' as const
  };

  const tabButtonStyle = (active: boolean) => ({
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    whiteSpace: 'nowrap' as const,
    backgroundColor: active ? '#ff6600' : '#e5e7eb',
    color: active ? 'white' : '#374151',
    border: 'none',
    cursor: 'pointer'
  });

  const gridStyle = {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(250px, 1fr))' : '1fr'
  };

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem',
    gap: '0.5rem'
  };

  const pageButtonStyle = (active: boolean) => ({
    padding: '0.5rem 1rem',
    border: active ? '1px solid #ff6600' : '1px solid #d1d5db',
    backgroundColor: active ? '#ff6600' : 'white',
    color: active ? 'white' : '#374151',
    borderRadius: '0.375rem',
    cursor: 'pointer'
  });

  return (
    <>
      <Header />
      <div style={containerStyle}>
        {/* Breadcrumbs */}
        <div style={breadcrumbStyle}>
          Você está em: <a href="#" style={{ color: '#ff6600', textDecoration: 'none' }}>Hardware</a>
        </div>

        {/* Banner Dell */}
        <div style={bannerStyle}>
          <div style={bannerTextStyle}>
            <img src="https://placehold.co/150x30/FFFFFF/FFFFFF?text=DELL" alt="Dell Technologies" style={{ height: '2rem' }} />
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '1rem' }}>TECNOLOGIA PREMIADA</h2>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800' }}>Inovação que<br />transforma.</h1>
          </div>
          <img src="https://placehold.co/400x200/eee/333?text=Dell+Products" alt="Dell Products" style={bannerImageStyle} />
          <a href="#" style={bannerButtonStyle}>APROVEITE {'>'}</a>
        </div>

        <div style={offerBarStyle}>
          Ofertas De Hardware: Placas De Vídeo, SSD E Processadores No KaBuM!
        </div>

        <div style={mainContentStyle}>
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onToggleGroup={handleToggleGroup}
          />

          {/* Conteúdo Principal da Listagem */}
          <main style={mainStyle}>
            {/* Controles de Ordenação e Visualização */}
            <div style={controlsStyle}>
              <div style={controlsLeftStyle}>
                <label style={labelStyle}>
                  Ordernar:
                  <select style={selectStyle}>
                    <option>Mais procurados</option>
                    <option>Mais vendidos</option>
                    <option>Menor preço</option>
                    <option>Maior preço</option>
                  </select>
                </label>
                <label style={labelStyle}>
                  Exibir:
                  <select style={selectStyle}>
                    <option>20 por página</option>
                    <option>50 por página</option>
                    <option>100 por página</option>
                  </select>
                </label>
              </div>
              <div style={controlsRightStyle}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>8543 produtos</span>
                <button
                  onClick={() => setViewMode('grid')}
                  style={viewButtonStyle(viewMode === 'grid')}
                >
                  <i className="pi pi-th-large" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={viewButtonStyle(viewMode === 'list')}
                >
                  <i className="pi pi-list" />
                </button>
              </div>
            </div>

            {/* Abas de Categoria */}
            <div style={tabsStyle}>
              <div style={tabsContainerStyle}>
                <h3 style={tabTitleStyle}>CATEGORIAS</h3>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    style={tabButtonStyle(activeTab === category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de Produtos */}
            <div style={gridStyle}>
              {listingProducts.map(product => (
                <ListingProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Paginação */}
            <div style={paginationStyle}>
              <button style={pageButtonStyle(false)}>
                <i className="pi pi-chevron-left" />
              </button>
              <button style={pageButtonStyle(true)}>1</button>
              <button style={pageButtonStyle(false)}>2</button>
              <button style={pageButtonStyle(false)}>3</button>
              <span style={{ padding: '0.5rem', color: '#374151' }}>...</span>
              <button style={pageButtonStyle(false)}>100</button>
              <button style={pageButtonStyle(false)}>
                <i className="pi pi-chevron-right" />
              </button>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
