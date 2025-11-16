import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import PrimeReact styles
import "primereact/resources/themes/lara-light-blue/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css"; // PrimeFlex for utility classes

import './index.css';
import './styles/components.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)