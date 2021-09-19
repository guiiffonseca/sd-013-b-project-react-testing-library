import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste se o topo tem um conjunto fixo de links de navegação.', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Home', () => {
    expect(screen.getByRole('link', { name: /Home/ })).toHaveAttribute('href', '/');
  });
  test('About', () => {
    expect(screen.getByRole('link', { name: /About/ })).toHaveAttribute('href', '/about');
  });
  test('Favorite Pokémons', () => {
    expect(screen.getByRole('link', { name: /Favorite Pokémons/ }))
      .toHaveAttribute('href', '/favorites');
  });
});

describe('Teste se a aplicação é redirecionada', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Para home', () => {
    userEvent.click(screen.getByRole('link', { name: /Home/ }));

    expect(screen
      .getByRole('heading', { name: /encountered pokémons/i })).toBeInTheDocument();
  });

  test('Para About', () => {
    userEvent.click(screen.getByRole('link', { name: /About/ }));

    expect(screen
      .getByRole('heading', { name: /about pokédex/i })).toBeInTheDocument();
  });

  test('Para Favorite', () => {
    userEvent.click(screen
      .getByRole('link', { name: /Favorite Pokémons/ }));

    expect(screen
      .getByRole('heading', { name: /Favorite Pokémons/i })).toBeInTheDocument();
  });
  test('Para Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota');
    expect(screen
      .getByRole('heading', { name: /page requested not found/i })).toBeInTheDocument();
  });
});
