import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('App.js tests.', () => {
  it('Ao entrar na página verifica se o primeiro link contem o texto "Home" ', () => {
    renderWithRouter(<App />);

    const linkHomeText = screen.getByText('Home');

    expect(linkHomeText).toBeInTheDocument();
  });

  it('Ao entrar na página verifica se o segundo link contem o texto "About" ', () => {
    renderWithRouter(<App />);

    const linkAboutText = screen.getByText('About');

    expect(linkAboutText).toBeInTheDocument();
  });

  it(`Ao entrar na página verifica se o segundo link contem o 
    texto "Favorite Pokémons"`, () => {
    renderWithRouter(<App />);

    const linkFavoriteText = screen.getByText('Favorite Pokémons');

    expect(linkFavoriteText).toBeInTheDocument();
  });

  it(`Verifica se ao clicar no link "Home" da barra de navegação é redirecionado para
    a pagina inicial na URL "/"`, () => {
    const { history } = renderWithRouter(<App />);

    const homeTextLink = screen.getByText('Home');
    userEvent.click(homeTextLink);

    expect(history.location.pathname).toBe('/');
  });

  it(`Verifica se ao clicar no link "About" da barra de navegação é redirecionado para
    a pagina inicial na URL "/about"`, () => {
    const { history } = renderWithRouter(<App />);

    const linkAboutText = screen.getByText('About');
    userEvent.click(linkAboutText);

    expect(history.location.pathname).toBe('/about');
  });

  it(`Verifica se ao clicar no link "About" da barra de navegação é redirecionado para
    a pagina inicial na URL "/favorites"`, () => {
    const { history } = renderWithRouter(<App />);

    const linkFavoriteText = screen.getByText('Favorite Pokémons');
    userEvent.click(linkFavoriteText);

    expect(history.location.pathname).toBe('/favorites');
  });

  test(`Verifica se ao clicar no link "About" da barra de navegação é redirecionado para
    a pagina inicial na URL "/favorites"`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-nao-existente');
    const pageNotFound = screen.getByText('Page requested not found');

    expect(pageNotFound).toBeInTheDocument();
  });
});
