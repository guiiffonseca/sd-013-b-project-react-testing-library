import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('testa se o topo da aplicação contém um conjunto de 3 links de navegação', () => {
    // renderiza o app:
    renderWithRouter(<App />);
    // acessa os links :
    const homeLink = screen.getByRole('link', { name: /Home/i });
    const aboutLink = screen.getByText('About');
    const favoritePokemonsLink = screen.getByText('Favorite Pokémons');
    // testa se os tres links existem na pagina :
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  test('Testa se redireciona p/ pág inical na URL / ao clicar no link Home', () => {
    // Renderiza app e captura o history:
    const { history } = renderWithRouter(<App />);
    // Acessa o link Home:
    const homeLink = screen.getByRole('link', { name: /Home/i });
    // simula click no Link Home :
    userEvent.click(homeLink);
    // testa se esta na pasta "/":
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('Testa se redireciona p/ pág About URL/about,ao clicar no link About', () => {
    // Renderiza App e captura history:
    const { history } = renderWithRouter(<App />);
    // Acessa o link About:
    const aboutLink = screen.getByRole('link', { name: /About/i });
    // Simula click no link About:
    userEvent.click(aboutLink);
    // Testa se esta na pasta /about:
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste se redireciona p/ Pokémons Favoritados na URL/favorites ao clicar', () => {
    // Renderiza App e captura history:
    const { history } = renderWithRouter(<App />);
    // Acessa o link Pokémons Favoritados:
    const favoritePokemonsLink = screen.getByRole('link',
      { name: /Favorite Pokémons/i });
    // Simula click no link Pokémons Favoritados:
    userEvent.click(favoritePokemonsLink);
    // Testa se está na pasta /favorites
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se é redirecionado para pag NotFound ao entrar em URL desconhecida', () => {
    // Renderiza App e captura history:
    const { history } = renderWithRouter(<App />);
    // Pusha uma URL qualquer:
    history.push('/diferente');
    // Testa se Aparece na Tela aviso NotFound:
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
