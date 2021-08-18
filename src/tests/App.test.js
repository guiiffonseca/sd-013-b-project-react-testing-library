import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Links de navegação', () => {
  test('Teste se há links de navegação da página ', () => {
    const { getByText } = renderWithRouter(<App />);
    const link1 = getByText(/Home/);
    expect(link1).toBeInTheDocument();

    const link2 = getByText(/About/);
    expect(link2).toBeInTheDocument();

    const link3 = getByText(/Favorite Pokémons/);
    expect(link3).toBeInTheDocument();
  });
});

describe('Teste dos links', () => {
  test('Teste se  é redirecionada ao clicar no link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Home/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
  });
});
