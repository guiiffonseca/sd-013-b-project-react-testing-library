import React from 'react';
// import { Router } from 'react-router';
// import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
// import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('Se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const linkMoreDetails = screen.getByRole('link', {
      name: 'More details',
    });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(linkMoreDetails).toBeInTheDocument();
  });

  test('Se ao clicar no link é feito o redirecionamento para página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pikachuUrl = '/pokemons/25';

    const linkMoreDetails = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(linkMoreDetails);

    const pokemonDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(pokemonDetails).toBeInTheDocument();
    expect(history.location.pathname).toBe(pikachuUrl);
  });

  test('Se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const pikachuUrl = '/pokemons/25';
    history.push(pikachuUrl);

    const clickFavoriteButton = screen.getByText('Pokémon favoritado?');
    userEvent.click(clickFavoriteButton);

    const favoritedIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritedIcon).toBeInTheDocument();
    expect(favoritedIcon).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );
  });
});
