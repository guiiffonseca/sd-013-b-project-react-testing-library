import React from 'react';
// import { Router } from 'react-router';
// import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
// import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

const moreDetails = 'More details';

describe('Teste o componente <Pokemon.js />', () => {
  test('Se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const linkMoreDetails = screen.getByRole('link', {
      name: moreDetails,
    });

    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(linkMoreDetails.textContent).toBe(moreDetails);
  });

  test('Se ao clicar no link é feito o redirecionamento para página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pikachuUrl = '/pokemons/25';

    const linkMoreDetails = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(linkMoreDetails);

    const pokemonDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(pokemonDetails.textContent).toBe('Pikachu Details');
    expect(history.location.pathname).toBe(pikachuUrl);
  });

  test('Se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const pikachuUrl = '/pokemons/25';
    history.push(pikachuUrl);

    const clickFavoriteButton = screen.getByText('Pokémon favoritado?');
    userEvent.click(clickFavoriteButton);

    const favoritedIconDetails = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritedIconDetails).toBeInTheDocument();
    expect(favoritedIconDetails).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );

    const spriteDetails = screen.getByAltText('Pikachu sprite');
    expect(spriteDetails).toBeInTheDocument();
    expect(spriteDetails).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );

    history.push('/');
    const favoritedIconMainPage = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritedIconMainPage).toBeInTheDocument();
    expect(favoritedIconMainPage).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );

    const spriteMainPage = screen.getByAltText('Pikachu sprite');
    expect(spriteMainPage).toBeInTheDocument();
    expect(spriteMainPage).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });
});
