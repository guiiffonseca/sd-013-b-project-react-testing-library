import { screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o App.js', () => {
  test('Testa se contém um conjunto de links de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByText(/Home/);
    fireEvent.click(linkHome);
    let url = history.location.pathname;
    expect(url).toBe('/');

    const linkAbout = screen.getByText(/About/);
    fireEvent.click(linkAbout);
    url = history.location.pathname;
    expect(url).toBe('/about');

    const linkFavorite = screen.getByText(/Favorite Pokémons/);
    fireEvent.click(linkFavorite);
    url = history.location.pathname;
    expect(url).toBe('/favorites');
  });
});
