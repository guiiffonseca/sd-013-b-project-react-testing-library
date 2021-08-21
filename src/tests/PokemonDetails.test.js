import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do componente pokemonDetails', () => {
  test('Testa se ha o link More details na tela ', () => {
    renderWithRouter(<App />);
    const mDetails = screen.getByRole('link', {
      name: 'More details',
    });
    expect(mDetails).toBeInTheDocument();
    userEvent.click(mDetails);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const gameLoc = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(gameLoc).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    const sumary = screen.getByText(/This intelligent Pokémon/i);
    const pFavoritado = screen.getByLabelText('Pokémon favoritado?');
    expect(sumary).toBeInTheDocument();
    expect(mDetails).not.toBeInTheDocument();
    expect(pFavoritado).toBeInTheDocument();
  });
});
