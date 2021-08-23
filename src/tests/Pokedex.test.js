import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';
import App from '../App';

const POKEMON_NAME = 'pokemon-name';

describe('5. Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const title = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(title).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon
  é clicado.`, () => {
    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnNext).toBeInTheDocument();
    // O botão deve conter o texto Próximo pokémon;
    expect(btnNext).toHaveTextContent('Próximo pokémon');
    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    const pokemonLoad = screen.getByTestId(POKEMON_NAME);
    const pokemonsTest = [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
    ];
    for (let i = 0; i < pokemonsTest.length; i += 1) {
      userEvent.click(btnNext);
      expect(pokemonLoad).toHaveTextContent(pokemonsTest[i]);
    }
    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
    userEvent.click(btnNext);
    expect(pokemonLoad).toHaveTextContent(/pikachu/i);
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const pokemonsLoad = screen.getAllByTestId(POKEMON_NAME);
    expect(pokemonsLoad).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    let cont = 0;
    const buttonsTypeTotal = 7;
    buttonsType.forEach((button) => {
      const button1TextContent = button.textContent;
      buttonsType.forEach((button2) => {
        const button2TextContent = button2.textContent;
        if (button1TextContent === button2TextContent) {
          cont += 1;
        }
      });
    });
    // espero ter ao todo 7 botões, no total da contagem acima
    expect(cont).toBe(buttonsTypeTotal);

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    const firePokemons = ['Charmander', 'Rapidash'];
    const buttonFire = screen.getByRole('button', { name: /fire/i });
    const pokemonLoad = screen.getByTestId(POKEMON_NAME);
    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(buttonFire);
    expect(buttonFire).toHaveTextContent(/fire/i);

    for (let i = 0; i < firePokemons.length; i += 1) {
      expect(pokemonLoad).toHaveTextContent(firePokemons[i]);
      userEvent.click(btnNext);
    }

    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
    // pegando o que está aparecendo na tela atualmente, ou seja, o teste é uma continuação do que foi feito acima, ou seja, o tipo que está na tela é: Fire
    const pokemonType = screen.getByTestId('pokemon-type');
    const buttonType = screen.getByRole('button', { name: /fire/i });
    expect(buttonType.textContent).toBe(pokemonType.textContent);

    // O botão All precisa estar sempre visível.
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    // O texto do botão deve ser All;
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();

    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
    userEvent.click(buttonAll);
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });

    pokemons.forEach((pokemon) => {
      const pokemonLoad = screen.getByTestId(POKEMON_NAME);
      // espero que o nome que esteja aparecendo na tela seja o mesmo nome que está no data.js, na 1 posição
      expect(pokemonLoad === pokemon.name);
      userEvent.click(buttonNext);
    });
  });
});
