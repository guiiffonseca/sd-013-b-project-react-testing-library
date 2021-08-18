import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';

describe('Testando o "App.js"', () => {
  it('testando a montagem dos componentes de navegation', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    const About = screen.getByRole('link', { name: 'About' });
    const favoritePok = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(home).toBeInTheDocument();
    expect(About).toBeInTheDocument();
    expect(favoritePok).toBeInTheDocument();
  });

  it('testando o link "About" de navegation', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);
    const aboutPokedex = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    const url = history.location.pathname;
    expect(url).toBe('/about');
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('testando o link "Home" de navegation', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    userEvent.click(home);
    const homePag = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    const url = history.location.pathname;
    expect(url).toBe('/');
    expect(homePag).toBeInTheDocument();
  });

  it('testando o link "Favorite Pokémons" de navegation', () => {
    const { history } = renderWithRouter(<App />);
    const favPok = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favPok);
    const pagPokFav = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
    expect(pagPokFav).toBeInTheDocument();
  });

  it('testando a pág "Not Found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notFound');
    const titleNotFound = screen.getByRole('heading', {
      name: /Page requested not found/i });
    expect(titleNotFound).toBeInTheDocument();
  });
});
