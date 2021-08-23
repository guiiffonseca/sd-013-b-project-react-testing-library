import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, screen } from '@testing-library/react';

import App from '../App';

describe('Testando o component App.js', () => {
  it('Testa se ao carregar a página Pokedex renderiza no caminho "/"', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const textHome = screen.getByText(/Encountered pokémons/i);
    expect(textHome).toBeInTheDocument();
  });

  it('Testa se topo tem conjunto fixo de links (Home, About, Favorite Pokémons)', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const linkToHome = screen.getByText(/Home/i);
    expect(linkToHome).toBeInTheDocument();

    const linkToAbout = screen.getByText(/About/i);
    expect(linkToAbout).toBeInTheDocument();

    const linkToFavorite = screen.getByText(/Favorite Pokémons/i);
    expect(linkToFavorite).toBeInTheDocument();
  });

  it('Testa se vai para "/" ao clicar em Home', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const homeSubTitle = screen.getByText(/Encountered pokémons/i);
    const linkToHome = screen.getByText(/Home/i);

    fireEvent.click(linkToHome);
    expect(homeSubTitle).toBeInTheDocument();
  });

  it('Testa se é direcionada para a página de About em /About, ao ser clicado', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkToAbout = screen.getByText(/About/i);

    fireEvent.click(linkToAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se é redirecionado para /favorites ao clicar em Favorites Pokémons', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkToFavorite = screen.getByText(/Favorite Pokémons/i);

    fireEvent.click(linkToFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se redireciona para página Not Found ao submeter url desconhecida', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    history.push('/qualquer string');
    const NotFound = screen.getByText(/Page requested not found/i);
    expect(NotFound).toBeInTheDocument();
  });
});
