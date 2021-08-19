import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente App', () => {
  it('Existe um conjunto de links no topo da navegação', () => {
    renderWithRouter(<App />);

    const linkToHome = screen.getByText('Home');
    const linkToAbout = screen.getByText('About');
    const linkToFavorites = screen.getByText('Favorite Pokémons');

    expect(linkToHome).toBeInTheDocument();
    expect(linkToAbout).toBeInTheDocument();
    expect(linkToFavorites).toBeInTheDocument();
  });

  it('Ao clicar em Home a aplicação deve ser redirecionada à sua página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByText('Home');
    const { location: { pathname } } = history;

    userEvent.click(linkToHome);
    expect(pathname).toBe('/');
  });
  it('Ao clicar em About a aplicação é redirecionada à página About', () => {
    const { history } = renderWithRouter(<App />);

    const linkToAbout = screen.getByText('About');

    userEvent.click(linkToAbout);
    const { location: { pathname } } = history;
    const aboutText = screen.getByText(/a digital encyclopedia/i);

    expect(aboutText).toBeInTheDocument();
    expect(pathname).toBe('/about');
  });

  it('Clicar em Favorite Pokémons redireciona a aplicação à Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const linkToFavorites = screen.getByText('Favorite Pokémons');
    const favoriteText = screen.getByText(/favorite pokémons/i);

    userEvent.click(linkToFavorites);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
    expect(favoriteText).toBeInTheDocument();
  });

  it('Entrar em uma URL desconhecida redireciona à página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau/');

    const notFoundText = screen.getByText('Page requested not found');
    expect(notFoundText).toBeInTheDocument();
  });
});
