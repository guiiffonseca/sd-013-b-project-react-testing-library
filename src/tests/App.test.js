import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      test('O primeiro link deve possuir o texto Home.', () => {
        renderWithRouter(<App />);
        const getAllByRole = screen.getAllByRole('link')[0];
        expect(getAllByRole.textContent).toBe('Home');
      });
      test('O segundo link deve possuir o texto About.', () => {
        renderWithRouter(<App />);
        const getAllByRole = screen.getAllByRole('link')[1];
        expect(getAllByRole.textContent).toBe('About');
      });
      test('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
        renderWithRouter(<App />);
        const getAllByRole = screen.getAllByRole('link')[2];
        expect(getAllByRole.textContent).toBe('Favorite Pokémons');
      });
    });
  test('É redirecionada para a página inicial, na URL / ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);
    const homeButton = screen.getAllByRole('link')[0];
    expect(history.entries.length).toBe(1);
    fireEvent.click(homeButton);
    expect(history.entries.length).toBe(2);
    expect(history.entries[1].pathname).toBe('/');
  });
  test('É redirecionada para a página About, na URL /about ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);
    const aboutButton = screen.getAllByRole('link')[1];
    expect(history.entries.length).toBe(1);
    fireEvent.click(aboutButton);
    expect(history.entries.length).toBe(2);
    expect(history.entries[1].pathname).toBe('/about');
  });
  test('Redireciona para Pokémons Favoritados, na URL /favorites ao clicar', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesButton = screen.getAllByRole('link')[2];
    expect(history.entries.length).toBe(1);
    fireEvent.click(favoritesButton);
    expect(history.entries.length).toBe(2);
    expect(history.entries[1].pathname).toBe('/favorites');
  });
});
