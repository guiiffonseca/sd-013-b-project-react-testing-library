import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './utils/RenderWithRouter';

describe('Testa o componente App.js', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    RenderWithRouter(<App />);

    const linkHome = screen.getByText('Home');
    const linkAbout = screen.getByText('About');
    const linkFavoritePokemons = screen.getByText('Favorite Pokémons');

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  test('se a aplicação é redirecionada para a página inicial, na URL / ao '
    + 'clicar no link Home da barra de navegação.', () => {
    const { history } = RenderWithRouter(<App />);

    const linkHome = screen.getByText('Home');
    userEvent.click(linkHome);
    const { pathname } = history.location;
    const encounteredText = screen.getByRole('heading', { level: 2 });

    expect(pathname).toBe('/');
    expect(encounteredText).toHaveTextContent(/encountered/i);
  });

  test('se a aplicação é redirecionada para a página de About, na URL /about, '
    + 'ao clicar no link About da barra de navegação.', () => {
    const { history } = RenderWithRouter(<App />);

    const linkAbout = screen.getByText('About');
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    const aboutText = screen.getByRole('heading', { level: 2 });

    expect(pathname).toBe('/about');
    expect(aboutText).toHaveTextContent(/about/i);
  });

  test('se a aplicação é redirecionada para a página de Pokémons Favoritados, na '
    + 'URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação', () => {
    const { history } = RenderWithRouter(<App />);

    const linkFavoritePokemons = screen.getByText('Favorite Pokémons');
    userEvent.click(linkFavoritePokemons);
    const { pathname } = history.location;
    const favoriteText = screen.getByRole('heading', { level: 2 });

    expect(pathname).toBe('/favorites');
    expect(favoriteText).toHaveTextContent(/favorite/i);
  });

  test('se a aplicação é redirecionada para a página Not Found ao entrar em uma '
    + 'URL desconhecida.', () => {
    const { history } = RenderWithRouter(<App />);

    history.push('/pagina-not-found');
    const notFoundText = screen.getByText(/not found/i);

    expect(notFoundText).toBeInTheDocument();
  });
});
