import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const value = 7;
    renderWithRouter(<App />);

    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton).toHaveLength(value);
    const NameButton = screen.getAllByText(/Psychic/i);
    expect(NameButton).toHaveLength(1);
  });

  test('Testa se o botão all está visivel', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    fireEvent.click(allButton);
    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});
