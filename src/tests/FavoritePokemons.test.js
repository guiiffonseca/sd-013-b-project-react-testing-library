import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from '../services/renderWithRouter';

describe('<FavoritePokemons.js /> Integration Tests:', () => {
  test('1) Se é exibido na tela a mensagem "No favorite pokemon found",'
  + ' se a pessoa não tiver pokémons favoritos.',
  () => {
    render(<MemoryRouter><FavoritePokemons /></MemoryRouter>);

    const noFavoritePokemonText = screen.getByText('No favorite pokemon found');

    expect(noFavoritePokemonText).toBeInTheDocument();
  });

  // test('2) Se é exibido todos os cards de pokémons favoritados.',
  //   () => {
  //     render(<MemoryRouter><FavoritePokemons /></MemoryRouter>);

  //     const imagePokedex = screen.getAllByRole('img');

  //     // expect(imagePokedex).toBeInTheDocument();
  //   });
});
