import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Testando o componente App.js', () => {
  test('Deve renderizar o componente Home', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
  });

  test('Deve renderizar o componente About', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
  });

  test('Deve renderizar o componente Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);
  });

  test('Deve renderizar o componente Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
