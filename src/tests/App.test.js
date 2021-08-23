import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste do component <App.js />', () => {
  test('Se o topo da aplicação contém um link para a página Home', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  test('Se o topo da aplicação contém um link para a página About', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });

  test('Se o topo da aplicação contém um link para a página Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite/i });
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  test('Se ao clicar no link Home é redirecionado para página correta', () => {
    renderWithRouter(<App />);

    const clickHomeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(clickHomeLink);
    const homeAfterClick = screen.getByText(/Encountered pokémons/i);
    expect(homeAfterClick).toBeInTheDocument();
  });

  test('Se ao clicar no link About é redirecionado para página correta', () => {
    renderWithRouter(<App />);

    const clickAboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(clickAboutLink);
    const aboutAfterClick = screen.getByText(/About Pokédex/i);
    expect(aboutAfterClick).toBeInTheDocument();
  });

  test('Se ao clicar no link Favorite Pokémons é redirecionado para página correta', () => {
    renderWithRouter(<App />);

    const clickFavoritePokemonsLink = screen.getByRole('link', { name: /Favorite/i });
    userEvent.click(clickFavoritePokemonsLink);
    const FavoritePokemonsAfterClick = screen.getByRole('heading', {
      level: 2,
      name: /Favorite Pokémons/i,
    });
    expect(FavoritePokemonsAfterClick).toBeInTheDocument();
  });
});
