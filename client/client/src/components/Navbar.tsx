import React from 'react';
import './Navbar.css';

const Navbar = () => {
  const categories = [
    'Hardware',
    'Periféricos',
    'Computadores',
    'Monitores',
    'Cadeiras Gamer',
    'Games',
    'Celulares',
    'TV'
  ];

  return (
    <nav className="app-navbar">
      <ul>
        {categories.map(category => (
          <li key={category}>
            <a href="#">{category}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;