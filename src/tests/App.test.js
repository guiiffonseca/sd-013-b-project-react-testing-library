import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('Verifica se o link home redireciona para a pagina inicial', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Verifica se o link about redireciona para a about', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Verifica se o link Favorite Pokemon redireciona para a favorites', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorites).toBeInTheDocument();

    userEvent.click(linkFavorites);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Se é enviada a página Not Found ao entrar em URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/urldesconhecida');
    const NotFound = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(NotFound).toBeInTheDocument();
  });
});
