import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const pokemonsList = ['Charmander',
  'Caterpie',
  'Ekans',
  'Alakazam',
  'Mew',
  'Rapidash',
  'Snorlax',
  'Dragonair',
  'Pikachu',
];

const pokemonType = ['Electric',
  'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Normal', 'Dragon'];

describe('Teste do component Pokedex.js ', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    expect(screen
      .getByRole('heading', { level: 2, name: /encountered pokémons/i }))
      .toBeInTheDocument();
  });
});

describe('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  const btnNext = 'next-pokemon';

  test('O botão deve conter o texto Próximo pokémon', () => {
    expect(screen
      .getByTestId(btnNext))
      .toBeInTheDocument();
  });

  test('Os próximos da lista devem ser mostrados, ao clicar no botão', () => {
    pokemonsList.forEach((element) => {
      userEvent.click(screen.getByTestId(btnNext));
      expect(screen.getByText(element)).toBeInTheDocument();
    });
  });
  test('O primeiro deve ser mostrado ao clicar no botão, se estiver no último', () => {
    for (let index = 0; index <= pokemonsList.length; index += 1) {
      userEvent.click(screen.getByTestId(btnNext));
      if (pokemonsList[index] === 'Pikachu') {
        userEvent.click(screen.getByTestId(btnNext));
        expect(screen.getByText('Charmander')).toBeInTheDocument();
      }
    }
  });
});

describe('Teste se é mostrado apenas um Pokémon por vez.', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
  });
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Existir um botão de filtragem para cada tipo de Pokémon, sem repetição.', () => {
    const typeBtns = screen.getAllByTestId('pokemon-type-button');
    const typeBtnsLength = 7;
    expect(typeBtns).toHaveLength(typeBtnsLength);
  });

  test('A Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    pokemonType.forEach((name) => {
      userEvent.click(screen.getByRole('button', { name: `${name}` }));
      expect(screen.getByTestId('pokemon-type').innerHTML).toEqual(name);
    });
  });
  test('O botão All precisa estar sempre visível.', () => {
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('O texto do botão deve ser All', () => {
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });

  test('A Pokedéx deverá mostrar os Pokémons quando o botão All for clicado', () => {
    pokemonsList.forEach((element) => {
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
      expect(screen.getByTestId('pokemon-name').innerHTML).toEqual(element);
    });
  });

  test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
  });
});
