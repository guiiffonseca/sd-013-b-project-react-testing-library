import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa o componente App', () => {
  describe('testes no link home', () => {
    test('testa se renderiza o link home', () => {
      renderWithRouter(<App />);

      const home = screen.getByText(/Home/i);
      expect(home).toBeInTheDocument();
    });

    test('testa se redireciona para a página /', () => {
      const { history } = renderWithRouter(<App />);

      const home = screen.getByText(/Home/i);
      userEvent.click(home);
      const { pathname } = history.location;
      // no objeto history tem uma chave location, essa chave location contém outro objeto que tem o pathname, que vai conter a rota.
      expect(pathname).toBe('/');
    });
  });
  describe('testes no link about', () => {
    test('testa se renderiza o link about', () => {
      renderWithRouter(<App />);

      const about = screen.getByText(/About/i);
      expect(about).toBeInTheDocument();
    });

    test('testa se redireciona para a página /about', () => {
      const { history } = renderWithRouter(<App />);

      const about = screen.getByText(/About/i);
      userEvent.click(about);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });
  });
  describe('testes no link favorites', () => {
    test('testa se renderiza o link favorites', () => {
      renderWithRouter(<App />);

      const favorites = screen.getByText(/Favorite Pokémons/i);
      expect(favorites).toBeInTheDocument();
    });
    test('testa se redireciona para a página /favorites', () => {
      const { history } = renderWithRouter(<App />);

      const favorites = screen.getByText(/Favorite Pokémons/i);
      userEvent.click(favorites);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
  });
  describe('testa página não encontrada', () => {
    test('teste se renderiza Not Found quando url não for encontrada', () => {
      const { history } = renderWithRouter(<App />);

      history.push('rota-nao-existe');
      // o .push permite mudar de rota dentro do ambiente de testes.

      const notFound = screen.getByText(/not found/i);
      expect(notFound).toBeInTheDocument();
    });
  });
});
