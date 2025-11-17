import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage/index';
import { LoginPage } from '../../pages/LoginPage/index';
import { RegisterPage } from '../../pages/RegisterPage/index';
import ProductListingPage from '../../pages/ProductListingPage/index';
import CartPage from '../../pages/CartPage/index';
import { RequireAuth } from '../../components/require-auth';
import { PublicOnlyRoute } from '../../components/public-only-route';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes for logged-out users only */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Public route */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="/hardware" element={<ProductListingPage />} />
      <Route path="/cart" element={<CartPage />} />

      {/* Protected routes for logged-in users */}
      <Route element={<RequireAuth />}>
        {/* Other protected pages can be added here */}
      </Route>
    </Routes>
  );
};
