
import React from 'react';
import CountdownTimer from './CountdownTimer';
import './PromoBar.css';

const PromoBar = () => {
  return (
    <div className="promo-bar-container">
      <h2 className="promo-bar-title">DROP DE OFERTAS</h2>
      <CountdownTimer />
    </div>
  );
}

export default PromoBar;
