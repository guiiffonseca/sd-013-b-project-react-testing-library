import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../Helper/RenderWithRouter';
import pokemons from '../data';

describe('Testing FavoritePokemons.js component', () => {
  it('should display no fav pok found if there are none', ()=> {
    renderWithRouter(<FavoritePokemons />);
    const noFavFound = screen.getByText('No favorite pokemon found');
    expect(noFavFound).toBeInTheDocument();
  });

  it('should display fav poke when receveid poke as prop', ()=> {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const favPokeImg = screen.getAllByRole('img');
    expect(favPokeImg.length).not.toBe(0);
  });
});
