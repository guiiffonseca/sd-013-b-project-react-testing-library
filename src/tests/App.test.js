import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithrouter';
import App from '../App';

describe('Teste se a aplicação é redirecionada para', () => {
  it('a página inicial, na URL /', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    const aboutAll = screen.getByText(/Encountered pokémons/);
    expect(aboutAll).toBeInTheDocument();
  });
  it('a página de About, na URL /about', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
    const aboutAll = screen.getByText(/About Pokédex/);
    expect(aboutAll).toBeInTheDocument();
  });
  it('a página de Pokémons Favoritados, na URL /favorites', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Favorite Pokémons/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
    const aboutAll = screen.getByText(/Favorite pokémons/);
    expect(aboutAll).toBeInTheDocument();
  });
  it('a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
