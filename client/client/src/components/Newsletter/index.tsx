import React from 'react';

const Newsletter = () => {
  // Estilos inline baseados no CSS fornecido
  const newsletterSectionStyle = {
    backgroundColor: '#1e40af', /* bg-blue-800 */
    padding: '2rem 0' /* py-8 */
  };

  const newsletterContainerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem', /* px-4 */
    display: 'flex',
    flexDirection: 'row' as const, /* md:flex-row */
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem' /* gap-6 */
  };

  const newsletterTextStyle = {
    color: 'white',
    textAlign: 'left' as const
  };

  const newsletterTitleStyle = {
    fontSize: '1.5rem', /* text-2xl */
    fontWeight: 800, /* font-extrabold */
    margin: '0 0 0.25rem 0' /* mb-1 */
  };

  const newsletterSubtitleStyle = {
    fontSize: '1.125rem' /* text-lg */
  };

  const newsletterFormStyle = {
    flex: '1 1 0%',
    width: '100%',
    maxWidth: '42rem', /* max-w-2xl */
    display: 'flex',
    flexDirection: 'row' as const, /* sm:flex-row */
    gap: '0.75rem' /* gap-3 */
  };

  const newsletterInputStyle = {
    flex: '1 1 0%',
    height: '3rem', /* h-12 */
    borderRadius: '0.5rem', /* rounded-lg */
    padding: '0.5rem 1rem', /* px-4 py-2 */
    color: '#1f2937', /* text-gray-800 */
    border: 'none'
  };

  const newsletterButtonStyle = {
    height: '3rem', /* h-12 */
    padding: '0 1.5rem', /* px-6 */
    backgroundColor: '#f97316', /* bg-orange-500 */
    color: 'white',
    fontWeight: 700, /* font-bold */
    borderRadius: '0.5rem', /* rounded-lg */
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  return (
    <section style={newsletterSectionStyle}>
      <div style={newsletterContainerStyle}>
        <div style={newsletterTextStyle}>
          <h3 style={newsletterTitleStyle}>Katchau News</h3>
          <p style={newsletterSubtitleStyle}>Receba ofertas exclusivas no seu e-mail</p>
        </div>
        <form style={newsletterFormStyle}>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            style={newsletterInputStyle}
          />
          <button
            type="submit"
            style={newsletterButtonStyle}
          >
            CADASTRAR
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
