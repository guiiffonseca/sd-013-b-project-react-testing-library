import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testando o componente App.js', () => {
  test('A aplicação deve ter um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByText('Home');
    const linkAbout = screen.getByText('About');
    const linkFavoritePokemon = screen.getByText('Favorite Pokémons');

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemon).toBeInTheDocument();
  });

  test('Ao clicar em home deve ser direcionado para "/"', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByText('Home');
    userEvent.click(linkHome);
    const titleHome = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(titleHome).toBeInTheDocument();
  });

  test('Ao clicar em about deve ser direcionado para "/about"', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByText('About');
    userEvent.click(linkAbout);
    const titleAbout = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(titleAbout).toBeInTheDocument();
  });

  test('Ao clicar em Favorite pokémons deve ser direcionado para "/favorites"', () => {
    renderWithRouter(<App />);
    const linkFavoritePokemon = screen.getByText('Favorite Pokémons');
    userEvent.click(linkFavoritePokemon);
    const titleFavoritePokemon = screen.getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });
    expect(titleFavoritePokemon).toBeInTheDocument();
  });

  test('Ao digitar uma URL desconhecida, redireciona para "Not Found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/outraUrl');
    const titleNotFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(titleNotFound).toBeInTheDocument();
  });
});
