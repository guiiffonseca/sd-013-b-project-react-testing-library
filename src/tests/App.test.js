import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste do componente App', () => {
  test('Verifica se o primeiro link cotém o texto Home', () => {
    renderWithRouter(<App />);
    const textHome = screen.getByRole('link', {
      name: 'Home',
    });
    expect(textHome).toBeInTheDocument();
  });

  test('Verifica se o primeiro linl cotém o texto Home', () => {
    renderWithRouter(<App />);
    const textAbout = screen.getByRole('link', {
      name: 'About',
    });
    expect(textAbout).toBeInTheDocument();
  });

  test('Verifica se o primeiro linl cotém o texto Home', () => {
    renderWithRouter(<App />);
    const textFavorites = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(textFavorites).toBeInTheDocument();
  });

  test('Verifica se a aplicação é redirecionada clicando no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se a aplicação é redirecionada clicando no link About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test(`Verifica se a aplicação é redirecionada clicando 
  no link Favorite Pokémons`, () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(linkFavorites);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    const textNotFound = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(textNotFound).toBeInTheDocument();
  });
});
