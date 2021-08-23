import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Pokedex } from '../components';
import renderWithRouter from './renderWithRouter';

const pokemons = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
},
{
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
}];

describe('Testes do component <Pokedex.js />', () => {
  test('Se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ false } />);

    const heading = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  test('Se muda o Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ false } />);

    userEvent.click(screen.getByRole('button', { name: 'Próximo pokémon' }));
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Próximo pokémon' }));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  test('Se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ false } />);

    expect(screen.getAllByTestId('pokemon-type-button').length).toBe(2);
    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ false } />);

    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
