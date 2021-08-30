import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from './Utils/utils';

describe('Testes do App.js', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const home = screen.getByText('Home');
      const about = screen.getByText('About');
      const favorite = screen.getByText('Favorite Pokémons');
      expect(home).toBeInTheDocument();
      expect(about).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();
    });

  test('Teste se ao clicar no link ele redireciona para home "/" ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const homeTextHeader = screen.getByRole('heading', {
      name: /Pokédex/,
      level: 1,
    });
    expect(homeTextHeader).toBeInTheDocument();
  });

  test('Teste se ao clicar no link ele redireciona para about "/about" ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const aboutText = screen.getByRole('heading', {
      name: /About Pokédex/,
      level: 2,
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('Teste se ao clicar no link ele redireciona para favorite "/favorites" ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const favoriteText = screen.getByRole('heading', {
      name: /Favorite pokémons/,
      level: 2,
    });
    expect(favoriteText).toBeInTheDocument();
  });

  test('Teste se ao entrar em uma rota desconhecida renderiza "not found" ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-desconhecida');

    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
