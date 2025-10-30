
import React, { useState, useEffect } from 'react';
import './index.css';

const CountdownTimer = ({ compact = false }) => {
  const calculateTimeLeft = () => {
    // Define a data alvo (3 dias, 14h, 09m, 03s a partir de agora)
    const targetTime = new Date().getTime() + (3 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (9 * 60 * 1000) + (3 * 1000);

    const difference = targetTime - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { dias: 0, horas: 0, minutos: 0, segundos: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const formatTime = (time) => String(time).padStart(2, '0');

  if (compact) {
    return (
      <div className="countdown-compact">
        <i className="pi pi-bolt"></i>
        <span>TERMINA EM:</span>
        <span>{formatTime(timeLeft.dias)}D :</span>
        <span>{formatTime(timeLeft.horas)} :</span>
        <span>{formatTime(timeLeft.minutos)} :</span>
        <span>{formatTime(timeLeft.segundos)}</span>
      </div>
    );
  }

  return (
    <div className="countdown-default">
      <span className="countdown-label">TERMINA EM:</span>
      <div className="countdown-timer-boxes">
        <span className="timer-box">{formatTime(timeLeft.dias)}D</span>
        <span className="timer-box">{formatTime(timeLeft.horas)}</span>
        <span className="timer-separator">:</span>
        <span className="timer-box">{formatTime(timeLeft.minutos)}</span>
        <span className="timer-separator">:</span>
        <span className="timer-box">{formatTime(timeLeft.segundos)}</span>
      </div>
    </div>
  );
}

export default CountdownTimer;
