
import React from 'react';
import { relatedLinks } from '../../data/mockData';

const RelatedLinks = () => {

  // Estilos inline
  const relatedLinksSectionStyle = {
    padding: '3rem 1rem',
    backgroundColor: '#f9fafb'
  };

  const relatedLinksContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const relatedLinksHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const relatedLinksDecoratorStyle = {
    width: '4px',
    height: '2rem',
    backgroundColor: '#ff6600'
  };

  const relatedLinksTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0'
  };

  const linksWrapperStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem'
  };

  const linkTagStyle = {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
    border: '1px solid #d1d5db',
    borderRadius: '9999px',
    color: '#374151',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s'
  };

  return (
    <section style={relatedLinksSectionStyle}>
      <div style={relatedLinksContainerStyle}>
        <div style={relatedLinksHeaderStyle}>
          <span style={relatedLinksDecoratorStyle}></span>
          <h2 style={relatedLinksTitleStyle}>LINKS RELACIONADOS</h2>
        </div>
        <div style={linksWrapperStyle}>
          {relatedLinks.map(link => (
            <a
              key={link}
              href="#"
              style={linkTagStyle}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedLinks;
