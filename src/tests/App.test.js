import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa conjunto de Links do App', () => {
  describe('Testes no Link Home', () => {
    it('deve renderizar o link com texto Home', () => {
      renderWithRouter(<App />);
      const home = screen.getByText(/home/i);
      expect(home).toBeInTheDocument();
    });

    it('deve redirecionar para pagina /', () => {
      const { history } = renderWithRouter(<App />);
      const home = screen.getByText(/home/i);
      fireEvent.click(home);
      const { pathname } = history.location;

      expect(pathname).toBe('/');
    });
  });
  describe('Testes no Link About', () => {
    it('deve renderizar o link com texto About', () => {
      renderWithRouter(<App />);
      const about = screen.getByText(/About/i);
      expect(about).toBeInTheDocument();
    });
    it('deve redirecionar para página /about', () => {
      const { history } = renderWithRouter(<App />);
      const about = screen.getByText(/about/i);
      expect(about).toBeInTheDocument();
      fireEvent.click(about);
      const { pathname } = history.location;

      expect(pathname).toBe('/about');
    });
  });
  describe('Testes no link Favorite Pokemons', () => {
    it('deve renderizar o link com texto Favorite Pokémons', () => {
      renderWithRouter(<App />);
      const favPokemon = screen.getByText(/Favorite Pokémons/i);
      expect(favPokemon).toBeInTheDocument();
    });
    it('deve redirecionar para a pagina /favorite', () => {
      const { history } = renderWithRouter(<App />);
      const favPokemon = screen.getByText(/Favorite Pokémons/i);
      expect(favPokemon).toBeInTheDocument();
      fireEvent.click(favPokemon);
      const { pathname } = history.location;

      expect(pathname).toBe('/favorites');
    });
  });
  describe('Testa pagina nao encontrada', () => {
    it('deve rederizar Not Found quando nao encontrar url', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pikachu');
      const notFound = screen.getByText(/not found/i);
      expect(notFound).toBeInTheDocument();
    })
  })
});
