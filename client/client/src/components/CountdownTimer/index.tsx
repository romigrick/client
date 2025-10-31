
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ compact = false }) => {
  const calculateTimeLeft = (): { dias: number; horas: number; minutos: number; segundos: number } => {
    // Define a data alvo (3 dias, 14h, 09m, 03s a partir de agora)
    const targetTime = new Date().getTime() + (3 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (9 * 60 * 1000) + (3 * 1000);

    const difference = targetTime - new Date().getTime();

    if (difference > 0) {
      return {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState<{ dias: number; horas: number; minutos: number; segundos: number }>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const formatTime = (time: number) => String(time).padStart(2, '0');

  // Estilos inline
  const compactStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.125rem',
    color: '#f97316',
    fontWeight: 'bold'
  };

  const compactIconStyle = {
    fontSize: '1rem'
  };

  const compactLabelStyle = {
    fontSize: '0.75rem',
    marginBottom: '0.125rem'
  };

  const compactTimeStyle = {
    fontSize: '0.875rem',
    fontWeight: 'bold'
  };

  const regularStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const regularLabelStyle = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#1f2937'
  };

  const timeContainerStyle = {
    display: 'flex',
    gap: '0.25rem',
    fontSize: '1.125rem',
    fontWeight: 'bold'
  };

  const timeBoxStyle = {
    backgroundColor: 'white',
    color: '#f97316',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.375rem'
  };

  const colonStyle = {
    color: 'white'
  };

  if (compact) {
    return (
      <div style={compactStyle}>
        <div style={compactLabelStyle}><i className="pi pi-bolt" style={compactIconStyle}></i>TERMINA EM</div>
        <div style={compactTimeStyle}>
          {formatTime(timeLeft.dias)}D:{formatTime(timeLeft.horas)}:{formatTime(timeLeft.minutos)}:{formatTime(timeLeft.segundos)}
        </div>
      </div>
    );
  }

  return (
    <div style={regularStyle}>
      <span style={regularLabelStyle}>TERMINA EM:</span>
      <div style={timeContainerStyle}>
        <span style={timeBoxStyle}>{formatTime(timeLeft.dias)}D</span>
        <span style={timeBoxStyle}>{formatTime(timeLeft.horas)}</span>
        <span style={colonStyle}>:</span>
        <span style={timeBoxStyle}>{formatTime(timeLeft.minutos)}</span>
        <span style={colonStyle}>:</span>
        <span style={timeBoxStyle}>{formatTime(timeLeft.segundos)}</span>
      </div>
    </div>
  );
}

export default CountdownTimer;
