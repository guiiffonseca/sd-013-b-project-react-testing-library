import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

describe('Testa a renderização do componente About', () => {
  it('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutInfo = screen.getByText(/encyclopedia containing/);

    expect(aboutInfo).toBeInTheDocument();
  });

  it('Testa se a página contem um h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const h2 = screen.getByRole('heading', { level: 2 });

    expect(h2.textContent).toBe('About Pokédex');
  });

  it('Testa se a página contém a iamgem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByAltText('Pokédex');

    expect(img.src).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
