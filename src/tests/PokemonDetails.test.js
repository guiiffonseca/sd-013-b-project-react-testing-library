import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('PokemonDetails funciona corretamente', () => {
  it('Informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByText(/more details/i);

    const pikachu = 'Pikachu';

    userEvent.click(moreDetailsLink);
    const pikachuDetails = screen
      .getByRole('heading', { name: `${pikachu} Details`, level: 2 });

    expect(pikachuDetails).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summary).toBeInTheDocument();

    const pokeDetails = screen.getByText(/with electricity to make them tender enough/);
    expect(pokeDetails).toBeInTheDocument();
  });

  it('', () => {});

  it('', () => {});
});
