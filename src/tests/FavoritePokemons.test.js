import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testes do component <FavoritePokemons.js />', () => {
  test('Se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavorite = screen.getByText(/No favorite pokemon found/);
    expect(noFavorite).toBeInTheDocument();
  });

  test('Se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const details = screen.getByRole('heading', { name: /Details/, level: 2 });
    expect(details).toBeInTheDocument();

    const clickForFavorite = screen.getByRole('checkbox', { checked: false });
    userEvent.click(clickForFavorite);
    expect(screen.getByRole('checkbox', { checked: true }));

    const click = screen.getByText('Favorite Pokémons');
    userEvent.click(click);

    const afterClick = screen.getByText('Pikachu');
    expect(afterClick).toBeInTheDocument();
  });
});
