import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './utils/RenderWithRouter';

describe('Testa o componente About.js', () => {
  test('se é exibido na tela a mensagem No favorite pokemon found, '
    + 'se a pessoa não tiver pokémons favoritos.', () => {
    RenderWithRouter(<App />);

    const linkFavoritePokemons = screen.getByText('Favorite Pokémons');
    userEvent.click(linkFavoritePokemons);

    const noFavoriteText = screen.getByText('No favorite pokemon found');

    expect(noFavoriteText).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados.', () => {
    RenderWithRouter(<App />);
    const pokemonType = ['Fire', 'Bug', 'Poison'];

    pokemonType.forEach((type) => {
      const nextType = screen.getByText(type);
      userEvent.click(nextType);
      const moreDetails = screen.getByText(/details/i);
      userEvent.click(moreDetails);
      const checkbox = screen.getByRole('checkbox');
      userEvent.click(checkbox);
      const linkHome = screen.getByText('Home');
      userEvent.click(linkHome);
    });

    const linkFavoritePokemons = screen.getByText('Favorite Pokémons');
    userEvent.click(linkFavoritePokemons);

    pokemonType.forEach((type) => {
      const typeText = screen.getByText(type);
      expect(typeText).toBeInTheDocument();
    });
  });
});
