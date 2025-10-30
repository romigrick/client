
import React from 'react';
import { mockProducts } from '../../data/mockData';
import ProductCard from '../ProductCard/index';

const ProductCarousel = () => {
  // Em uma aplicação real, o scroll seria controlado por JS
  // Aqui, usamos overflow-x-auto para scroll nativo
  return (
    <section className="my-6">
      <div className="relative">
        <button className="hidden md:block absolute top-50 -translate-y-50 left-0 -ml-4 z-1 bg-white p-2 border-circle shadow-md border-none cursor-pointer hover:bg-gray-100">
          <i className="pi pi-chevron-left text-2xl" />
        </button>
        <div className="flex overflow-x-auto pb-4 -m-2 p-2">
          {mockProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <button className="hidden md:block absolute top-50 -translate-y-50 right-0 -mr-4 z-1 bg-white p-2 border-circle shadow-md border-none cursor-pointer hover:bg-gray-100">
          <i className="pi pi-chevron-right text-2xl" />
        </button>
      </div>
    </section>
  );
}

export default ProductCarousel;
