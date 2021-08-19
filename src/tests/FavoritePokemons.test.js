import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

test('Se é exibido a mensagem correta se a pessoa não tiver pokémons favoritos', () => {
  renderWithRouter(<FavoritePokemons />);
  const zeroFavorites = screen.getByText('No favorite pokemon found');
  expect(zeroFavorites).toBeInTheDocument();
});
//  realizado em conjunto com Ricardo e Rafael nas breakoutRooms
test('Se são exibidos todos os cards de pokémons favoritados', () => {
  renderWithRouter(<App />);
  const moreDetails = screen.getByText(/More Details/i);
  userEvent.click(moreDetails);
  const clickOn = screen.getByRole('checkbox');
  userEvent.click(clickOn);
  const favPok = screen.getByText(/Favorite Pokémons/i);
  userEvent.click(favPok);
  const weight = screen.getByText(/Average weight:/i);
  expect(weight).toBeInTheDocument();
});
