
import React from 'react';

// Import all the page components
import Header from '../components/Header';
import Hero from '../components/Hero';
import PromoBar from '../components/PromoBar';
import ProductCarousel from '../components/ProductCarousel';
import NinjaHighlights from '../components/NinjaHighlights';
import RecommendedBrands from '../components/RecommendedBrands';
import RelatedLinks from '../components/RelatedLinks';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Hero />
        <PromoBar />
        <ProductCarousel />
        <NinjaHighlights />
        <RecommendedBrands />
        <RelatedLinks />
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}

export default HomePage;
