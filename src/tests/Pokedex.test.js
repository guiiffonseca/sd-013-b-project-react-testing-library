import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('5. Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i
    });
    expect(title).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon
  é clicado.`, () => {
    renderWithRouter(<App />);

    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i});
    expect(btnNext).toBeInTheDocument();
    // O botão deve conter o texto Próximo pokémon;
    expect(btnNext).toHaveTextContent('Próximo pokémon');
    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    const pokemonLoad = screen.getByTestId('pokemon-name');
    const pokemonsTest = ['Charmander', 'Caterpie', 'Ekans'];
    for(let i = 0; i < 3; i++) {
      userEvent.click(btnNext);
      expect(pokemonLoad).toHaveTextContent(pokemonsTest[i]);
    }

// O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
  });
});
