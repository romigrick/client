
import React from 'react';
import { recommendedBrands } from '../../data/mockData';

const RecommendedBrands = () => {

  // Estilos inline
  const brandsSectionStyle = {
    padding: '3rem 1rem',
    backgroundColor: '#f9fafb'
  };

  const brandsHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    maxWidth: '1200px',
    margin: '0 auto 2rem auto'
  };

  const brandsTitleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const brandsTitleDecoratorStyle = {
    width: '4px',
    height: '2rem',
    backgroundColor: '#ff6600'
  };

  const brandsTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0'
  };

  const brandsViewAllStyle = {
    color: '#ff6600',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.875rem'
  };

  const brandsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const brandCardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.2s'
  };

  const brandImageStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    marginBottom: '1rem'
  };

  const brandNameStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 0.5rem 0'
  };

  const brandLinkStyle = {
    color: '#ff6600',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500'
  };

  return (
    <section style={brandsSectionStyle}>
      <div style={brandsHeaderStyle}>
        <div style={brandsTitleContainerStyle}>
          <span style={brandsTitleDecoratorStyle}></span>
          <h2 style={brandsTitleStyle}>MARCAS RECOMENDADAS</h2>
        </div>
        <a href="#" style={brandsViewAllStyle}>
          VER TODAS {'>'}
        </a>
      </div>
      <div style={brandsGridStyle}>
        {recommendedBrands.map(brand => (
          <div key={brand.id} style={brandCardStyle}>
            <img
              src={brand.imgSrc}
              alt={brand.name}
              style={brandImageStyle}
            />
            <h3 style={brandNameStyle}>{brand.name}</h3>
            <a href="#" style={brandLinkStyle}>
              VER PRODUTOS {'>'}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecommendedBrands;
