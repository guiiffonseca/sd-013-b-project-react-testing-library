import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o component Pokemon', () => {
  test('Teste se e renderizado um card com as info do pokemon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const image = screen.getByRole('img', {
      name: `${pokemonName.innerHTML} sprite`,
    });
    // toHavTextContent visto na documentacao https://testing-library.com/docs/react-testing-library/example-intro/
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    expect(pokemonType).toHaveTextContent(/Electric/i);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg$/i);
    expect(image.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testa se clicar no link leva a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(details).toHaveAttribute('href', '/pokemons/25');

    fireEvent.click(details);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(details);

    const textStart = screen.getByText('Summary');
    expect(textStart).toBeInTheDocument();

    const favoriteButton = screen.getByRole('checkbox');
    fireEvent.click(favoriteButton);
    const image = screen.getByRole('img', {
      name: /Pikachu is marked as favorite/i,
    });
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
