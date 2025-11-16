import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import ProductService from '../../services/productService';
import CategoryService from '../../services/categoryService';
import type { IProduct, ICategory, FilterOption, FilterGroup, FilterSidebarProps, ListingProductCardProps } from '../../commons/types';
import bannerImage from '../../assets/1761763638esquenta-black-das-blacks.webp';

// --- Dados Mockados para Filtros ---

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
function FilterSidebar({ filters, onFilterChange, onToggleGroup, categories, selectedCategory, onCategoryChange }: FilterSidebarProps) {
  const sidebarStyle = {
    width: '30%',
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
    marginTop: '1rem',
    marginBottom: '1rem'
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

  const categoryOptionStyle = (active: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    color: active ? '#ff6600' : '#374151',
    cursor: 'pointer',
    marginBottom: '0.5rem',
    fontWeight: active ? 'bold' : 'normal'
  });

  return (
    <aside style={sidebarStyle}>

      <h3 style={categoryTitleStyle}>Filtrar por Categoria</h3>
      <div style={optionsStyle}>
        <label style={categoryOptionStyle(!selectedCategory)} onClick={() => onCategoryChange('')}>
          <input
            type="radio"
            name="category"
            checked={!selectedCategory}
            onChange={() => onCategoryChange('')}
            style={{ marginRight: '0.5rem' }}
          />
          TODOS
        </label>
        {categories.map(category => (
          <label key={category.id} style={categoryOptionStyle(selectedCategory === category.name)} onClick={() => onCategoryChange(category.name)}>
            <input
              type="radio"
              name="category"
              checked={selectedCategory === category.name}
              onChange={() => onCategoryChange(category.name)}
              style={{ marginRight: '0.5rem' }}
            />
            {category.name}
          </label>
        ))}
      </div>

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
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    position: 'relative'
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '9rem',
    objectFit: 'contain',
    alignSelf: 'center'
  };

  const starsContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.125rem',
    justifyContent: 'flex-end',
    marginBottom: '0.5rem'
  };

  const starStyle = (filled: boolean): React.CSSProperties => ({
    fontSize: '0.75rem',
    color: filled ? '#fb923c' : '#d1d5db'
  });

  const reviewCountStyle: React.CSSProperties = {
    marginLeft: '0.25rem',
    fontSize: '0.75rem',
    color: '#6b7280'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: '#374151',
    overflow: 'hidden',
    margin: 0,
    fontWeight: 'bold'
  };

  const pricingStyle: React.CSSProperties = {
    // marginTop: 'auto' // This was removed
  };

  const newPriceStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#dc2626'
  };

  const pixInfoStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: '#059669'
  };

  const installmentsStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: 0
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: '0.5rem',
    width: '100%',
    backgroundColor: '#ff6600',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer'
  };

  const renderStars = (rating: number = 5, reviewCount: number = 980) => {
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
      {renderStars()}
      <img
        src={product.urlImagem || 'https://placehold.co/150x150/eee/333?text=Produto'}
        alt={product.name}
        style={imageStyle}
      />
      <p style={titleStyle}>
        {product.name}
      </p>

      <div style={pricingStyle}>
        <div style={newPriceStyle}>
          {formatPrice(product.price)}
        </div>
        <p style={pixInfoStyle}>à vista no PIX</p>
        <p style={installmentsStyle}>ou 10x de {formatPrice(product.price / 10)}</p>

        <button style={buttonStyle}>
          COMPRAR
        </button>
      </div>
    </div>
  );
}

// --- Componente Principal da Página ---
export default function ProductListingPage() {
  const location = useLocation();
  const [filters, setFilters] = useState<FilterGroup[]>(mockFilters);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('Mais procurados');

  const searchParams = new URLSearchParams(location.search);
  const categoryFromUrl = searchParams.get('category') || '';
  const searchFromUrl = searchParams.get('search') || '';
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl);
  const [searchQuery, setSearchQuery] = useState<string>(searchFromUrl);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFromUrl = searchParams.get('category') || '';
    const searchFromUrl = searchParams.get('search') || '';
    setSelectedCategory(categoryFromUrl);
    setSearchQuery(searchFromUrl);
    setCurrentPage(0); // Reset to first page when category or search changes
  }, [location.search]);

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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedCategory) {
          response = await ProductService.findByCategoryName(selectedCategory);
        } else {
          response = await ProductService.findAll();
        }
        if (response.success && response.data) {
          let fetchedProducts = response.data as IProduct[];

          // Apply search filter if searchQuery
          if (searchQuery) {
            fetchedProducts = fetchedProducts.filter(product =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }

          // Apply sorting if sortOrder is not 'Mais procurados'
          if (sortOrder !== 'Mais procurados') {
            fetchedProducts = [...fetchedProducts].sort((a, b) => {
              if (sortOrder === 'Menor preço') {
                return Number(a.price) - Number(b.price);
              } else if (sortOrder === 'Maior preço') {
                return Number(b.price) - Number(a.price);
              } else if (sortOrder === 'Mais vendidos') {
                // For now, sort by id as a proxy for popularity
                return (b.id || 0) - (a.id || 0);
              }
              return 0;
            });
          }

          // Calculate totalElements and totalPages
          let totalElements = fetchedProducts.length;
          let totalPages = Math.ceil(totalElements / pageSize);

          // Apply client-side pagination
          fetchedProducts = fetchedProducts.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

          setProducts(fetchedProducts);
          setTotalElements(totalElements);
          setTotalPages(totalPages);
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, pageSize, selectedCategory, sortOrder, searchQuery]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentPage(0);
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

  const bannerStyle = {
    width: '100%',
    height: '12rem',
    borderRadius: '0.5rem',
    marginBottom: '1.5rem',
    overflow: 'hidden'
  };

  const bannerTextStyle = {
    flex: 1
  };

  const bannerImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
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
    paddingRight: '2rem'
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
          Você está em: <a href="/" style={{ color: '#ff6600', textDecoration: 'none' }}>Home</a>
          {searchQuery && (
            <>
              {' / '}
              <span>Busca por "{searchQuery}"</span>
            </>
          )}
          {selectedCategory && !searchQuery && (
            <>
              {' / '}
              <span>{selectedCategory}</span>
            </>
          )}
        </div>

        {/* Banner Dell */}
        <div style={bannerStyle}>
          <img src={bannerImage} alt="Dell Products" style={bannerImageStyle} />
        </div>

        <div style={offerBarStyle}>
          Ofertas em {selectedCategory || 'Todos'}
        </div>

        <div style={mainContentStyle}>
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onToggleGroup={handleToggleGroup}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Conteúdo Principal da Listagem */}
          <main style={mainStyle}>
            {/* Controles de Ordenação e Visualização */}
            <div style={controlsStyle}>
              <div style={controlsLeftStyle}>
                <label style={labelStyle}>
                  Ordernar:
                  <select style={selectStyle} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option>Mais procurados</option>
                    <option>Mais vendidos</option>
                    <option>Menor preço</option>
                    <option>Maior preço</option>
                  </select>
                </label>
                <label style={labelStyle}>
                  Exibir:
                  <select style={selectStyle} value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                    <option value={10}>10 por página</option>
                    <option value={20}>20 por página</option>
                    <option value={50}>50 por página</option>
                    <option value={100}>100 por página</option>
                  </select>
                </label>
              </div>
              <div style={controlsRightStyle}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{totalElements} produtos</span>
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

            {/* Grid de Produtos */}
            <div style={gridStyle}>
              {loading ? (
                <div className="text-center w-full py-8">Carregando produtos...</div>
              ) : (
                products.map(product => (
                  <ListingProductCard key={product.id} product={product} />
                ))
              )}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div style={paginationStyle}>
                <button
                  style={pageButtonStyle(false)}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  <i className="pi pi-chevron-left" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    style={pageButtonStyle(i === currentPage)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  style={pageButtonStyle(false)}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
                >
                  <i className="pi pi-chevron-right" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
