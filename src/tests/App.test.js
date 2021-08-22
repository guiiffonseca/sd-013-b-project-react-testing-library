import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Testando componentes da Tela inicial', () => {
  it('testa se existe na página o conjunto de links', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', {
      name: /About/i,
    });
    expect(about).toBeInTheDocument();

    const favorites = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favorites).toBeInTheDocument();
  });

  it('testa se a aplicação é redirecionada para "/" após clicar no botão home', () => {
    renderWithRouter(<App />);

    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();

    userEvent.click(home);

    const inTheHome = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(inTheHome).toBeInTheDocument();
  });

  it('testa se é redirecionada para "/about" após clicar no botão', () => {
    renderWithRouter(<App />);

    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument();

    userEvent.click(about);

    const inTheAbout = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(inTheAbout).toBeInTheDocument();
  });

  it('testa se é redirecionada para "/favorites" após clicar no botão referente', () => {
    renderWithRouter(<App />);

    const favorites = screen.getByText(/Favorite pokémons/i);
    expect(favorites).toBeInTheDocument();

    userEvent.click(favorites);

    const inTheFavorites = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    expect(inTheFavorites).toBeInTheDocument();
  });
});
