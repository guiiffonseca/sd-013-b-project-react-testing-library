import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa se o App.js possui links por nome e redirecionamento.', () => {
  test('Teste que verifica a existência dos links', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/home/i);
    const favorite = screen.getByText(/favorite/i);
    const about = screen.getByText(/about/i);

    expect(home).toBeDefined();
    expect(favorite).toBeDefined();
    expect(about).toBeDefined();
    // expect(homePath).toBe('/');

    userEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');

    history.push('/notFound');
    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
