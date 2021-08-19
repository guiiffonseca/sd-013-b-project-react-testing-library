import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

test('Teste se é exibido na tela a mensagem e se a pessoa não tem pokémons favoritos.',
  () => {
    renderWithRouter(<FavoritePokemons />);

    expect(screen.getByText(/No favorite pokemon found/)).toBeInTheDocument();

    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    expect(screen.getByRole('heading', { name: /Details/, level: 2 }))
      .toBeInTheDocument();
    const elementClickForFavorite = screen.getByRole('checkbox', { checked: false });
    userEvent.click(elementClickForFavorite);
    expect(screen.getByRole('checkbox', { checked: true }));
    userEvent.click(screen.getByText('Favorite Pokémons'));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
