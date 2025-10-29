import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import { RequireAuth } from './components/require-auth';
import { PublicOnlyRoute } from './components/public-only-route';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            
            {/* Routes for logged-out users only */}
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Public route */}
            <Route path="/" element={<HomePage />} />

            {/* Protected routes for logged-in users */}
            <Route element={<RequireAuth />}>
              {/* Other protected pages can be added here */}
            </Route>

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;