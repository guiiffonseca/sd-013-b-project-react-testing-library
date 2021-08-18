import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/helper';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto de links de navegação', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const getHomeLink = screen.getByRole('link', { name: 'Home' });
    expect(getHomeLink).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const getAboutLink = screen.getByRole('link', { name: 'About' });
    expect(getAboutLink).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const getPokemonsLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(getPokemonsLink).toBeInTheDocument();
  });

  test('Se é redirecionado para página Home ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const getHomeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(getHomeLink);
    const homePage = screen.getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();
  });

  test('É redirecionado à página About e URL /about ao se clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const getAboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(getAboutLink);
    const getAboutText = screen.getByText(/About Pokédex/i);
    expect(getAboutText).toBeInTheDocument();
  });

  test('Redirecionado para Pokémons Favoritados ao clicar no link de mesmo nome', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const getPokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(getPokemonsLink);
    const favoritesPokemonsPage = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(favoritesPokemonsPage).toBeInTheDocument();
  });

  test('redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-inexistente');
    const notFoundPageContent = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundPageContent).toBeInTheDocument();
  });
});
