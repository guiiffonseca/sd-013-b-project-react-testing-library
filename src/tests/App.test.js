import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Links Tests', () => {
  test('How many link has in the page', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    const LINKS_LENGTH = 4;

    expect(links).toHaveLength(LINKS_LENGTH);
  });

  test('should check the links text individually', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveTextContent(/home/i);
    expect(links[1]).toHaveTextContent(/about/i);
    expect(links[2]).toHaveTextContent(/favorite pokémons/i);
  });

  test('Check Home URL', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');

    userEvent.click(links[0]);
    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  test('Check About URL', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');

    userEvent.click(links[1]);
    const path = history.location.pathname;
    expect(path).toBe('/about');
  });

  test('Check favorite pokémons URL', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');

    userEvent.click(links[2]);
    const path = history.location.pathname;
    expect(path).toBe('/favorites');
  });

  test('Not foud page', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/digimon');
    const text = screen.queryByText(/page requested not found/i);
    expect(text).toBeInTheDocument();
  });
});
