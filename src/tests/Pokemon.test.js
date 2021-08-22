import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Componente Pokemon funciona corretamente', () => {
  it('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByRole('img', { name: 'Pikachu sprite' });
    const pokeImgAlt = screen.getByAltText('Pikachu sprite');

    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeImg).toBeInTheDocument();
    expect(pokeImgAlt).toBeInTheDocument();

    expect(pokeName).toHaveTextContent('Pikachu');
    expect(pokeType).toHaveTextContent('Electric');
    expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByText('More details');

    userEvent.click(moreDetailsLink);

    const favoriteOptionCheckbox = screen
      .getByRole('checkbox', { name: /pokémon favoritado?/i });

    userEvent.click(favoriteOptionCheckbox);

    const favoriteIcon = screen.getByRole('img', { name: /marked as favorite/ });
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
