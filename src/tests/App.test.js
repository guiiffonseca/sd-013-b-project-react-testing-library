import React from 'react';
import { screen } from '@testing-library/react';
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
});
