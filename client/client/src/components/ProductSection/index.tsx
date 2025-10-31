import React from 'react';

const ProductSection = () => {
  // Estilos inline
  const productSectionStyle = {
    padding: '2rem'
  };

  const sectionTitleStyle = {
    fontSize: '1.8rem',
    color: '#ff6600',
    marginBottom: '1.5rem',
    textAlign: 'center'
  };

  const productGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    justifyItems: 'center'
  };

  return (
    <section style={productSectionStyle}>
      <h2 style={sectionTitleStyle}>As Melhores Ofertas</h2>
      <div style={productGridStyle}>
        {/* Product cards will be loaded here from the backend */}
        <p>Carregando produtos...</p>
      </div>
    </section>
  );
};

export default ProductSection;
