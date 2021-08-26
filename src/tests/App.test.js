import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste do componente <App.js />', () => {
  test('O topo da aplicação tem um conjunto de 3 links', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favoritePokemons = screen.getByText('Favorite Pokémons');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  test('A aplicação redireciona pra pag. inicial ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('A aplicação redireciona pra pag. /about ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /about/i });
    userEvent.click(home);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('A aplicação redireciona pra pag. /favorites ao clicar em fav. pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(home);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('A aplicação redireciona pra pag. Not Found ao usar uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/urlqualquer');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
