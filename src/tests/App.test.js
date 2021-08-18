import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('App.js tests', () => {
  let history;
  beforeEach(() => {
    history = renderWithRouter(<App />).history;
  });

  it('should have a set of navigation links', () => {
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Favorite Pokémons' })).toBeInTheDocument();
  });

  it('should redirect to main page "/" when clicking Home', () => {
    userEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(history.location.pathname).toBe('/');
  });

  it('should redirect to about page "/about" when clicking About', () => {
    userEvent.click(screen.getByRole('link', { name: 'About' }));
    expect(history.location.pathname).toBe('/about');
  });

  it('should redirect to page "/favorites" when clicking Favorite Pokémons', () => {
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    expect(history.location.pathname).toBe('/favorites');
  });

  it('should redirect to page "not found" for an unknown url', () => {
    history.push('/test');
    expect(
      screen.getByRole('heading', { level: 2, name: /Page requested not found/ }),
    ).toBeInTheDocument();
  });
});
