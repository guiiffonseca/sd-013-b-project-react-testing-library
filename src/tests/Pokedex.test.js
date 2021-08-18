import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testando o componente Pokedex.js', () => {
  it('Testa se a página contém um heading h2 com o texto Encontered Pokémons', () => {
    renderWithRouter(<App />);
    const h2Pokedex = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2Pokedex).toBeInTheDocument();
  });
});
