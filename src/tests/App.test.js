import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', { name: /Home/i });
      const linkAbout = screen.getByRole('link', { name: /About/i });
      const FavoritePokemon = screen.getByRole('link', { name: /Home/i });
      expect(linkHome).toBeInTheDocument();
      expect(linkAbout).toBeInTheDocument();
      expect(FavoritePokemon).toBeInTheDocument();
    });

  test(
    'Teste se é redirecionada para a página inicial, na URL / ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', { name: /Home/i });
      expect(linkHome).toBeInTheDocument();
      userEvent.click(linkHome);
      expect(history.location.pathname).toBe('/');
    },
  );

  test(
    'Teste se é redirecionada para de About, na URL /about, ao clicar no Link About',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', { name: /About/i });
      expect(linkAbout).toBeInTheDocument();
      userEvent.click(linkAbout);
      expect(history.location.pathname).toBe('/about');
    },
  );

  test(
    'Teste se é redirecionad para Poke. Fav., URL /favorites, ao clicar em  Fav. Pokém..',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(linkFavorite).toBeInTheDocument();
      userEvent.click(linkFavorite);
      expect(history.location.pathname).toBe('/favorites');
    },
  );

  test('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/AmoTests');
    expect(history.location.pathname).toBe('/AmoTests');
    const notFoundHeading = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    const notFoundImage = screen.getByAltText(/Pikachu crying/i);
    expect(notFoundHeading).toBeInTheDocument();
    expect(notFoundImage).toBeInTheDocument();
  });
});
