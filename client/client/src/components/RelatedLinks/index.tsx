
import React from 'react';
import { relatedLinks } from '../../data/mockData';
import './index.css';

const RelatedLinks = () => {
  return (
    <section className="related-links-section">
      <div className="related-links-container">
        <div className="related-links-header">
          <span className="related-links-decorator"></span>
          <h2 className="related-links-title">LINKS RELACIONADOS</h2>
        </div>
        <div className="links-wrapper">
          {relatedLinks.map(link => (
            <a 
              key={link}
              href="#"
              className="link-tag"
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
