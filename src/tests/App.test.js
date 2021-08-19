import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Name of the group', () => {
  test('testa se existe no topo da página o conjunto de links', () => {
    renderWithRouter(<App />);

    const home = screen.getByText(/Home/i);
    const about = screen.getByText(/About/i);
    const favorites = screen.getByText(/Favorite Pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });

  test('testa se a aplicação é redirecionada para "/" após clicar no botão home', () => {
    renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();
  });
});
