import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../unit/renderWithRouter';
import App from '../App';

describe('requisito 1', () => {
  test('Testa se há links na navegação', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const expectedLinksatNav = 3;
    expect(nav.childElementCount).toBe(expectedLinksatNav);
  });

  test('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const navLinks1 = nav.childNodes;
    expect(navLinks1[0].textContent).toBe('Home');
  });

  test('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const navLinks2 = nav.childNodes;
    expect(navLinks2[1].textContent).toBe('About');
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const navLinks3 = nav.childNodes;
    expect(navLinks3[2].textContent).toBe('Favorite Pokémons');
  });

  test('Teste se ao clicar em home volta a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const homeLinks = nav.childNodes[0];
    fireEvent.click(homeLinks);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('Teste se ao clicar em About vai para a página About', () => {
    const { history } = renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const AboutLink = nav.childNodes[1];
    fireEvent.click(AboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  test('Teste se clicar Favorite Pokémons renderiza na página Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const favPokemonLink = nav.childNodes[2];
    fireEvent.click(favPokemonLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
});
