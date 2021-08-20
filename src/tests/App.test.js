import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '.renderWithRouter';

describe('Testa se o App.js possui links por nome e redirecionamento.', () => {
  test('Teste que verifica a existência dos links', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/home/i);
    const favorite = screen.getByText(/favorite/i);
    const about = screen.getByText(/about/i);
    const homePath = history.location.pathname;
    const favoritePath = history.location.pathname;
    const aboutPath = history.location.pathname;
    const notFound = screen.getByText(/not found/i);

    expect(home).toBeDefined();
    expect(favorite).toBeDefined();
    expect(about).toBeDefined();
    expect(mainPath).toBe('/');

    userEvent.click(home);
    expect(homePath).toBe('/')
    userEvent.click(favorite);
    expect(favoritePath).toBe('/favorites');
    userEvent.click(about);
    expect(aboutPath).toBe('/about');
    
    history.push('/notFound');
    expect(notFound).toBeInTheDocument();
  });
});
