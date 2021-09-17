import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Teste se possui um nav', () => {
  it('abrir a página inicial na URL /', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    const context = screen.getByText(/Encountered pokémons/);
    expect(context).toBeInTheDocument();
  });
  it('abrir About na URL /about', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
    const context = screen.getByText(/About Pokédex/);
    expect(context).toBeInTheDocument();
  });
  it('abrir Pokémons Favoritados na URL /favorites', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Favorite Pokémons/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
    const context = screen.getByText(/Favorite pokémons/);
    expect(context).toBeInTheDocument();
  });
  it('abrir Not Found em outra URL.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
