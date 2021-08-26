import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente PokemonDetails', () => {
  test('Se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByText(/Encountered pokémons/);
    expect(h2).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon da lista quando Próximo pokemon é clicado', () => {
    renderWithRouter(<App />);
    const nextPoke = screen.getByText(/Próximo pokémon/);
    fireEvent.click(nextPoke);
    const actualPoke = screen.getByText(/Charmander/);
    expect(actualPoke).toBeInTheDocument();
  });

  test('Se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByText('All');
    fireEvent.click(allButton);
    const poke = screen.getAllByText(/Average weight/);
    expect(poke.length).toBe(1);
  });

  test('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    pokemons.forEach((types) => {
      const button = screen.getByRole('button', { name: (types.type) });
      expect(button).toBeInTheDocument();
    });
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const poke = screen.getAllByText(/Average weight/);
    expect(poke.length).not.toBe(0);
    const allButton = screen.getByText('All');
    const eletricButton = screen.getAllByTestId('pokemon-type-button')[0];
    fireEvent.click(eletricButton);
    fireEvent.click(allButton);
    expect(poke.length).not.toBe(0);
  });
});
