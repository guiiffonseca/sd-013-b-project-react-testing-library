import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente Pokemon', () => {
  const CHARMANDER_SPRITE = 'Charmander sprite';
  test('testando se renderiza um card de um pokemon', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByTestId('pokemon-name');
    const poketype = screen.getByTestId('pokemon-type');
    const pokeweight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByAltText(CHARMANDER_SPRITE);

    expect(pokeName).toHaveTextContent('Charmander');
    expect(poketype).toHaveTextContent('Fire');
    expect(pokeweight).toHaveTextContent('/avarage weight: 8.5 kg/i');
    expect(pokeImg).toBeInTheDocument();
  });

  test('testa se tem um link que exibe detalhes do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByText(/more details/i);

    userEvent.click(linkDetails);
    const path = history.location.pathname;
    expect(path).toBe('/pokemons/4');
  });

  test('Verifica a imagem do Pokemon atual', () => {
    renderWithRouter(<App />);
    const { image } = pokemons[1];
    const pokeImg = screen.getByAltText(CHARMANDER_SPRITE);

    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg).toHaveAttribute('alt', CHARMANDER_SPRITE);
    expect(pokeImg).toHaveAttribute('src', image);
  });

  test('Testa se tem estrelas nos pokemons favoritos', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByText(/more details/i);
    userEvent.click(linkDetails);

    const check = screen.getByRole('checkbox');
    userEvent.click(check);

    const iconFavorite = screen.getByAltText('Charmander is marked as favorite');
    expect(iconFavorite).toBeInTheDocument();
    expect(iconFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
