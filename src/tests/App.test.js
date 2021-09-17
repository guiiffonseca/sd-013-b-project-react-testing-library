import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import App from '../App';

const PATH_HOME = '/';
const PATH_ABOUT = '/about';
const PATH_FAVORITES = '/favorites';

describe('Teste se possui um nav', () => {
  it('abrir a página inicial na URL /', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe(PATH_HOME);

    // Verifica o heading
    const heading = screen.getByText(/Encountered pokémons/);
    expect(heading).toBeInTheDocument();
  });
  it('abrir About na URL /about', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe(PATH_ABOUT);

    // Verifica o heading
    const heading = screen.getByText(/About Pokédex/);
    expect(heading).toBeInTheDocument();
  });
  it('abrir Pokémons Favoritados na URL /favorites', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Favorite Pokémons/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe(PATH_FAVORITES);

    // Verifica o heading
    const heading = screen.getByText(/Favorite pokémons/);
    expect(heading).toBeInTheDocument();
  });
  it('abrir Not Found em outra URL.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const error404 = screen.getByText(/Page requested not found/i);
    expect(error404).toBeInTheDocument();
  });
});
