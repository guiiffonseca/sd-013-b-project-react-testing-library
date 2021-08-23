import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Pikachu');
    expect(screen.getByTestId('pokemon-type').textContent).toBe('Electric');
    expect(screen.getByTestId('pokemon-weight').textContent)
      .toBe(
        `Average weight: ${pokemons[0]
          .averageWeight.value} ${pokemons[0].averageWeight.measurementUnit}`,
      );
    expect(screen.getByAltText(`${pokemons[0].name} sprite`).src)
      .toBe(`${pokemons[0].image}`);
  });
  test('Teste se o card contém um link de navegação para exibir detalhes', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const btn = screen.getByText('More details');
    fireEvent.click(btn);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    expect(screen
      .getByAltText(`${pokemons[0].name} is marked as favorite`)).toBeInTheDocument();
    expect(screen.getByAltText(`${pokemons[0].name} is marked as favorite`).src).toBe('http://localhost/star-icon.svg');
  });
});
