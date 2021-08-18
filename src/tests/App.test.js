import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    expect(homeLink).toBeInTheDocument();
  });
  it('O segundo link deve possuir o texto about', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    expect(aboutLink).toBeInTheDocument();
  });
  it('O terceiro link deve possuir o texto Favorite Pokemons', () => {
    renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(favoriteLink).toBeInTheDocument();
  });
  it('Teste se a aplicação é redicionada para ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toEqual('/');
  });
  it('se a aplicação é redirecionada para a página de about com a url/about', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toEqual('/about');
  });
  it('se a aplicação é redirecionada para a página pokemon favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toEqual('/favorites');
  });
  it('teste se a aplicação é redirecionada para a página NotFound', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe');
    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
