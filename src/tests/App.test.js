import React from 'react';
import { fireEvent, screen, within } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o App.js', () => {
  test('Teste se o topo da aplicação contém um conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    // const home = screen.getByText(/Home/i);
    // expect(home).toBeInTheDocument();
    // expect(screen.getByText(/Home/i)).toBeInTheDocument();
    // expect(screen.getByText(/About/i)).toBeInTheDocument();
    // expect(screen.getByText(/Favorite Pokémons/i)).toBeInTheDocument();
    //
    // explicação:
    // o within tá buscando o elemento que seja uma barra de navegação, para
    // ai sim buscar os elemetos com a tag link dentro desta barra
    //
    const nav = within(screen.getByRole('navigation')).getAllByRole('link');
    expect(nav[0].textContent).toBe('Home');
    expect(nav[1].textContent).toBe('About');
    expect(nav[2].textContent).toBe('Favorite Pokémons');
  });
  test('Testa se ao clicar no Home redireciona para a página principal', () => {
    const { history } = renderWithRouter(<App />);
    const nav = within(screen.getByRole('navigation')).getAllByRole('link');
    fireEvent.click(nav[0]);
    expect(history.location.pathname).toBe('/');
  });
  test('Testa se ao clicar no about redireciona para a página correta', () => {
    const { history } = renderWithRouter(<App />);
    const nav = within(screen.getByRole('navigation')).getAllByRole('link');
    fireEvent.click(nav[1]);
    expect(history.location.pathname).toBe('/about');
  });
  test('Testa se ao clicar no Favorite redireciona para a página correta', () => {
    const { history } = renderWithRouter(<App />);
    const nav = within(screen.getByRole('navigation')).getAllByRole('link');
    fireEvent.click(nav[2]);
    expect(history.location.pathname).toBe('/favorites');
  });
  test('Testa se ao entrar numa URL falsa, aparece uma página não encontrada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/hahahaha');
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
