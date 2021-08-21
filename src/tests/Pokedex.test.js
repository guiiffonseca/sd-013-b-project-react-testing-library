import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Página Pokedex funciona corretamente', () => {
  it('Página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexText = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(pokedexText).toBeInTheDocument();
  });
  it('Exibe o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nextPokeBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(nextPokeBtn).toBeInTheDocument();

    const Pokemons = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];

    Pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon)).toBeInTheDocument();
      userEvent.click(nextPokeBtn);
    });
  });
  it('É mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokeImg = screen.getAllByRole('img', { name: /sprite/ });
    expect(pokeImg.length).toBe(1);
  });
  it('Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const nextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    const buttonsText = [
      'All',
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    buttonsText.forEach((text) => {
      expect(screen.getByRole('button', { name: `${text}` })).toBeInTheDocument();
    });

    const fireFilter = screen.getByRole('button', { name: buttonsText[2] });
    userEvent.click(fireFilter);
    expect(nextPoke.disabled).toBe(false);
  });
});
