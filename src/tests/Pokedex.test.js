import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/helper';
import App from '../App';

describe('Teste o componente Pokedex.js', () => {
  test('Se página contém um heading h2 com Encountered pokémons', () => {
    renderWithRouter(<App />);
    const encounteredPoke = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(encounteredPoke).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const nextPokeButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokeButton).toBeInTheDocument();

    userEvent.click(nextPokeButton);
    const nextPoke = screen.getByText('Charmander');
    expect(nextPoke).toBeInTheDocument();

    userEvent.click(nextPokeButton);
    userEvent.click(nextPokeButton);
    userEvent.click(nextPokeButton);
    userEvent.click(nextPokeButton);
    userEvent.click(nextPokeButton);
    userEvent.click(nextPokeButton);
    userEvent.click(nextPokeButton);
    userEvent.click(nextPokeButton);
    const firstPoke = screen.getByText('Pikachu');
    expect(firstPoke).toBeInTheDocument();
  });

  test('Se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokeId = screen.getAllByTestId('pokemon-name');
    expect(pokeId.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const pokemonType = screen.getByTestId('pokemon-type');
    filterButtons.forEach((button) => {
      userEvent.click(button);
      expect(button.innerHTML).toBe(pokemonType.innerHTML);
    });
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const filterButtonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(filterButtonAll);
    const firstPoke = screen.getByText('Pikachu');
    expect(firstPoke).toBeInTheDocument();
  });
});
