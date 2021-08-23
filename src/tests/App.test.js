import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Requisito 1 - App.js tests.', () => {
  it('Ao entrar na página verifica se o primeiro link exibe o texto "Home" ', () => {
    renderWithRouter(<App />);

    const linkHomeText = screen.getByRole('link', { name: 'Home' });
    expect(linkHomeText).toBeInTheDocument();
  });

  it('Ao entrar na página verifica se o segundo link exibe o texto "About" ', () => {
    renderWithRouter(<App />);

    const linkAboutText = screen.getByRole('link', { name: 'About' });
    expect(linkAboutText).toBeInTheDocument();
  });

  it(`Ao entrar na página verifica se o terceiro link exibe o 
    texto "Favorite Pokémons"`, () => {
    renderWithRouter(<App />);

    const linkFavoriteText = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavoriteText).toBeInTheDocument();
  });

  it(`Verifica se ao clicar no link "Home" da barra de navegação é redirecionado para
    a pagina inicial na URL "/"`, () => {
    const { history } = renderWithRouter(<App />);

    const linkHomeText = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHomeText);
    expect(history.location.pathname).toBe('/');
  });

  it(`Verifica se ao clicar no link "About" da barra de navegação é redirecionado para
    a pagina inicial na URL "/about"`, () => {
    const { history } = renderWithRouter(<App />);

    const linkAboutText = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAboutText);
    expect(history.location.pathname).toBe('/about');
  });

  it(`Verifica se ao clicar no link "About" da barra de navegação é redirecionado para
    a pagina inicial na URL "/favorites"`, () => {
    const { history } = renderWithRouter(<App />);

    const linkFavoriteText = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavoriteText);
    expect(history.location.pathname).toBe('/favorites');
  });

  test(`Verifica se a aplicação é redirecionada para a página 
  "Not Found" ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-nao-existente');
    const pageNotFound = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });

    expect(pageNotFound).toBeInTheDocument();
  });
});
