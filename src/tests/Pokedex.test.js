import React from 'react';
import { screen } from '@testing-library/react';
import renderRouter from '../components/renderRouter';
import App from '../App';

describe('Teste do componente notFound', () => {
  test('Teste se página contém um h2 com o texto Encountered pokémons', () => {
    renderRouter(<App />);
    const pokedexh2 = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(pokedexh2).toBeInTheDocument();
  });
  test('Testa se renderiza um botao e mostra proximo pokemon', () => {
    renderRouter(<App />);
    const botaoNext = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(botaoNext).toBeInTheDocument();
  });
});
