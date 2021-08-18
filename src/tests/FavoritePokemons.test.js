import React from 'react';
import { getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste Favorite Pokemons ', () => {
  test('Existe o texto nenhum pokemon encontrado?', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const TextPokemonfavoritNull = screen.getByText('No favorite pokemon found');
    expect(TextPokemonfavoritNull).toBeInTheDocument();
  });

  test('Cards com pokemons', () => {
    const IDPIKACHU = 25;
    const IDEKANS = 23;
    const { history } = renderWithRouter(<App />);
    const MoreDetails = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(MoreDetails);
    const check = screen.getByRole('checkbox');
    userEvent.click(check);
    const Favorite = screen.getByText('Favorite Pokémons');
    userEvent.click(Favorite);

    const Card = screen.getAllByRole('img');
    expect(Card[0]).toBeInTheDocument();
  });
});
