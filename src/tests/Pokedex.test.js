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
    const pokemonsTest = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam','Mew',
    'Rapidash', 'Snorlax', 'Dragonair'];
    for(let i = 0; i < 8; i++) {
      userEvent.click(btnNext);
      expect(pokemonLoad).toHaveTextContent(pokemonsTest[i]);
    };
    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
    userEvent.click(btnNext);
    expect(pokemonLoad).toHaveTextContent(/pikachu/i);
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonLoad = screen.getAllByTestId('pokemon-name');
    expect(pokemonLoad).toHaveLength(1);
  });
  
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    let cont = 0;
    // console.log(buttonsType[0].textContent);
    buttonsType.forEach((button) => {
      const button1TextContent = button.textContent;
      buttonsType.forEach((button2) => {
        const button2TextContent = button2.textContent;
        if (button1TextContent === button2TextContent) {
          cont += 1;
        };
      });
    });
    // espero ter apenas 7 botões no total da contagem acima
    expect(cont).toBe(7);
    
    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;

    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;

    // O botão All precisa estar sempre visível.
  });
});
