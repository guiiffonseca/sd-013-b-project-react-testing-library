import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRoutes from '../utils/renderWithRoutes';

import App from '../App';

describe('App.js', () => {
  it('should have a fixed links group', () => {
    renderWithRoutes(<App />);
    const [Home, About, Favorites] = screen.getAllByRole('link');

    expect(Home).toBeInTheDocument();
    expect(Home.innerHTML).toBe('Home');
    expect(About).toBeInTheDocument();
    expect(About.innerHTML).toBe('About');
    expect(Favorites).toBeInTheDocument();
    expect(Favorites.innerHTML).toBe('Favorite Pokémons');
  });

  it('should redirect to / when clicking on Home link', async () => {
    const { history } = renderWithRoutes(<App />);
    const HomeLink = screen.getByText('Home');

    fireEvent.click(HomeLink);

    expect(history.location.pathname).toBe('/');

    const HomeComponent = screen.getByText('Encountered pokémons');

    expect(HomeComponent).toBeInTheDocument();
  });

  it('should redirect to /about when clicking on About link', async () => {
    const { history } = renderWithRoutes(<App />);
    const AboutLink = screen.getByText('About');

    fireEvent.click(AboutLink);

    expect(history.location.pathname).toBe('/about');

    const AboutComponent = screen.getByText('About Pokédex');

    expect(AboutComponent).toBeInTheDocument();
  });

  it('should redirect to /favorites when clicking on Favorite Pokémons link',
    async () => {
      const { history } = renderWithRoutes(<App />);
      const FavoritesLink = screen.getByText('Favorite Pokémons');

      fireEvent.click(FavoritesLink);

      expect(history.location.pathname).toBe('/favorites');

      const FavoritesComponent = screen.getByText('Favorite pokémons');

      expect(FavoritesComponent).toBeInTheDocument();
    });

  it('should redirect to Not Found page when acessing an unknow URL',
    async () => {
      const { history } = renderWithRoutes(<App />);

      history.push('/unknow');

      const NotFound = screen.getByText('Page requested not found');

      expect(NotFound).toBeInTheDocument();
    });
});
