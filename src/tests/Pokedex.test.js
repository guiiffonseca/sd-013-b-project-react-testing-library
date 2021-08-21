import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Teste se página contém um heading h2 com o texto "Encountered pokémons".', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const hTwoText = screen.getByRole('heading', {
    name: /encountered pokémons/i, level: 2 });
  expect(hTwoText).toBeInTheDocument();
});

test(
  'O próximo Pokémon da lista deve ser exibido quando o botão Próximo pokémon é clicado.',
  () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const nextPokemonButton = screen.getByTestId('next-pokemon');
    expect(nextPokemonButton).toHaveTextContent('Próximo pokémon');
    userEvent.click(nextPokemonButton);
    const currentPokemon = screen.getByTestId('pokemon-name');
    expect(currentPokemon).toHaveTextContent('Charmander');
  },
);

test('A Pokédex deve conter os botões de filtro.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const filterPokemonsLength = 7;
  const elements = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const filterTypeButtons = screen.getAllByTestId('pokemon-type-button');
  expect(filterTypeButtons.length).toBe(filterPokemonsLength);
  filterTypeButtons.forEach((element, index) => {
    expect(element).toHaveTextContent(elements[index]);
  });
});

test('A Pokédex deve conter um botão para resetar o filtro', () => {
  global.filterPokemons = jest.fn((test) => console.log(test));
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const resetButton = screen.getByText(/all/i);
  expect(resetButton).toBeInTheDocument();
  userEvent.click(resetButton);
});
