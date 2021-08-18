import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './../App';
import renderWithRouter from './utils/renderWithRouter';

describe('1. Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação: Home, About, Favorite Pokémons ', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home', });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();

    const linkFavoritesPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavoritesPokemons).toBeInTheDocument();
  });
});
