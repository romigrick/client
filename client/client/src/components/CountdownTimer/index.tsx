
import React, { useState, useEffect } from 'react';

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
      <div className="flex align-items-center gap-1 text-orange-500 font-bold text-sm">
        <i className="pi pi-bolt text-base"></i>
        <span>TERMINA EM:</span>
        <span>{formatTime(timeLeft.dias)}D :</span>
        <span>{formatTime(timeLeft.horas)} :</span>
        <span>{formatTime(timeLeft.minutos)} :</span>
        <span>{formatTime(timeLeft.segundos)}</span>
      </div>
    );
  }

  return (
    <div className="flex align-items-center gap-2">
      <span className="text-sm font-medium text-gray-800">TERMINA EM:</span>
      <div className="flex gap-1 text-lg font-bold">
        <span className="bg-white text-orange-500 p-1 px-2 border-round-md">{formatTime(timeLeft.dias)}D</span>
        <span className="bg-white text-orange-500 p-1 px-2 border-round-md">{formatTime(timeLeft.horas)}</span>
        <span className="text-white">:</span>
        <span className="bg-white text-orange-500 p-1 px-2 border-round-md">{formatTime(timeLeft.minutos)}</span>
        <span className="text-white">:</span>
        <span className="bg-white text-orange-500 p-1 px-2 border-round-md">{formatTime(timeLeft.segundos)}</span>
      </div>
    </div>
  );
}

export default CountdownTimer;
