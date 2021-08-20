import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Página Pokedex funciona corretamente', () => {
  it('Página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexText = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(pokedexText).toBeInTheDocument();
  });
  it('Exibe o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nextPokeBtn = screen.getByTestId('next-pokemon');

    expect(nextPokeBtn).toBeInTheDocument();

    userEvent.click(nextPokeBtn);
    expect(screen.getByText('Charmander')).toBeInTheDocument();

    userEvent.click(nextPokeBtn);
    expect(screen.getByText('Caterpie')).toBeInTheDocument();
  });
  it('', () => {

  });
  it('', () => {

  });
});
