import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests 1 - Testing App', () => {
  it('Testing home link', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it('Testing about link', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });

  it('Testing favorite pokémons link', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(aboutLink).toBeInTheDocument();
  });
});
