import React, { useEffect, useState } from 'react';
import ProductService from '../../services/productService';
import type { IProduct } from '../../commons/types';
import ProductCard from '../ProductCard/index';

const ProductCarousel = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.findAll();
        if (response.success && response.data) {
          setProducts(response.data as IProduct[]);
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Em uma aplicação real, o scroll seria controlado por JS
  // Aqui, usamos overflow-x-auto para scroll nativo
  return (
    <section className="my-6">
      <div className="relative">
        <button className="hidden md:block absolute top-50 -translate-y-50 left-0 -ml-4 z-1 bg-white p-2 border-circle shadow-md border-none cursor-pointer hover:bg-gray-100">
          <i className="pi pi-chevron-left text-2xl" />
        </button>
        <div className="flex overflow-x-auto pb-4 -m-2 p-2 gap-4">
          {loading ? (
            <div className="text-center w-full py-8">Carregando produtos...</div>
          ) : (
            products.map(product => (
              <div key={product.id} className="flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
        <button className="hidden md:block absolute top-50 -translate-y-50 right-0 -mr-4 z-1 bg-white p-2 border-circle shadow-md border-none cursor-pointer hover:bg-gray-100">
          <i className="pi pi-chevron-right text-2xl" />
        </button>
      </div>
    </section>
  );
}

export default ProductCarousel;
