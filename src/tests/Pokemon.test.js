import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nextElementByButton from './utils/nextElementByButton';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('Testando o componente <Pokemon.js />', () => {
  test('É renderizado um card com as informações de determinado pokémon', () => {
    nextElementByButton('All', 'Pikachu', 'Electric', '6.0');
    const srcImage = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const altImage = 'Pikachu sprite';
    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('src', srcImage);
    expect(img).toHaveAttribute('alt', altImage);
  });

  test('testa se a url "/pokemons/25" é válida', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /More details/i,
    });

    expect(linkMoreDetails).toBeInTheDocument();
    expect(linkMoreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  test('testa se ao clicar em more details é redirecionado para "/pokemons/id"', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const linkMoreDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(linkMoreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const imgs = screen.getAllByRole('img');
    expect(imgs[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(imgs[1]).toHaveAttribute('src', '/star-icon.svg');
  });
});
