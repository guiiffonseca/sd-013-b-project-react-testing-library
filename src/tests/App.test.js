import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('testando o componente App', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favorites = screen.getByText('Favorite Pokémons');
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });
  test(`se a aplicação é redirecionada para a página inicial,
   na URL / ao clicar no link Home da barra de navegação`, () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    expect(home).toHaveAttribute('href', '/');
  });
  test(`se a aplicação é redirecionada para a página de About,
   na URL /about, ao clicar no link About da barra de navegação`, () => {
    renderWithRouter(<App />);
    const about = screen.getByText('About');
    expect(about).toHaveAttribute('href', '/about');
  });
  test(`se a aplicação é redirecionada para a página de Pokémons Favoritados,
   na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`, () => {
    renderWithRouter(<App />);
    const favorites = screen.getByText('Favorite Pokémons');
    expect(favorites).toHaveAttribute('href', '/favorites');
  });
});
