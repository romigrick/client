
import React from 'react';

const Hero = () => {
  return (
    <section className="my-4 flex flex-column md:flex-row gap-4">
      {/* Banner % OFF */}
      <div className="w-full md:w-3">
        <img 
          src="https://placehold.co/300x410/ff6600/ffffff?text=%25+OFF+NO+PIX" 
          alt="Banner de Ofertas % OFF"
          className="border-round-lg w-full h-full"
          style={{objectFit: 'cover'}}
        />
      </div>
      
      {/* Banner Festival de Cupons */}
      <div className="w-full md:w-9 relative">
        <img 
          src="https://placehold.co/850x410/003399/FFFFFF?text=FESTIVAL+DE+CUPONS" 
          alt="Banner Festival de Cupons"
          className="border-round-lg w-full h-full"
          style={{objectFit: 'cover'}}
        />
        <div 
          className="absolute bg-yellow-400 text-white py-1 px-3 border-circle text-sm font-bold flex align-items-center"
          style={{top: '1rem', left: '1rem'}}
        >
          <i className="pi pi-mobile mr-1 text-white"></i>
          Exclusivo no APP
        </div>
      </div>
    </section>
  );
}

export default Hero;
