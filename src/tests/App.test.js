import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Links de navegação', () => {
  test('Teste se há links de navegação da página ', () => {
    renderWithRouter(<App />);
    const link1 = screen.getByText(/Home/);
    expect(link1).toBeInTheDocument();

    const link2 = screen.getByText(/About/);
    expect(link2).toBeInTheDocument();

    const link3 = screen.getByText(/Favorite Pokémons/);
    expect(link3).toBeInTheDocument();
  });
});

// describe('Teste dos links', () => {
//   test('Teste se  é redirecionada ao clicar no link Home', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     userEvent.click(getByText(/Home/i));
//     const pathname = history.location.pathname;
//     expect(pathname).toBe('/');
//   });
// });
