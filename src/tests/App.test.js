import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente App', () => {
  test('verificando se tem link com o texto home', () => {
    renderWithRouter(<App />);
    const HomeText = screen.getByRole('link', {
      name: 'Home',
    });
    expect(HomeText).toBeInTheDocument();
  });

  test('verificando se tem link com o texto About', () => {
    renderWithRouter(<App />);
    const AboutText = screen.getByRole('link', {
      name: 'About',
    });
    expect(AboutText).toBeInTheDocument();
  });

  test('verificando se tem link com o Favorite Pokemons', () => {
    renderWithRouter(<App />);
    const PokemonsText = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(PokemonsText).toBeInTheDocument();
  });

  test('Deve redirecionar quando clicar no link Home para Homepage', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('Deve redirecionar quando clicar no link About para Aboutpage', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Deve redirecionar quando clicar no link para Pokémons Favoritados Page', () => {
    const { history } = renderWithRouter(<App />);
    const linkPokemons = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(linkPokemons);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Testa se redireciona para pagina Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
