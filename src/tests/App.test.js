import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Requirement 1 - Test the component <App />', () => {
  it('should first link contains the text "Home"', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeDefined();

    userEvent.click(home);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('should second link contains the text "About"', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeDefined();

    userEvent.click(about);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('should third link contains the text "Favorite Pokémons"', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritePokemons).toBeDefined();

    userEvent.click(favoritePokemons);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it('should redirect to Not Found page when link contains a unknown URL', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');

    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
