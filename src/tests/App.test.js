import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App.js tests', () => {
  test('Teste se contém um conjunto fixo de links, 1 Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    expect(home).toBeInTheDocument();
  });

  test('Teste se contém um conjunto fixo de links, 2 About', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    expect(about).toBeInTheDocument();
  });

  test('Teste se contém um conjunto fixo de links, 3 Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favorite).toBeInTheDocument();
  });

  test('clicar no link Home a pag é renderizada para URL /', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    fireEvent.click(home);
    const pathHome = history.location.pathname;
    expect(pathHome).toBe('/');
  });

  test('clicar no link About a pag é renderizada para URL /about', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    fireEvent.click(about);
    const pathAbout = history.location.pathname;
    expect(pathAbout).toBe('/about');
  });

  test('clicar no Favorite Pokémons a pag é renderizada para URL /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    fireEvent.click(favorite);
    const pathFavorite = history.location.pathname;
    expect(pathFavorite).toBe('/favorites');
  });

  test('redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/aaaaa');
    const localizar = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(localizar).toBeInTheDocument();
  });
});
