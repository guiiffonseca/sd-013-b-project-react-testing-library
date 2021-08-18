import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Requisito 1', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = screen.getByText(/Home/i);
    const about = screen.getByText(/About/i);
    const FavoritePokemon = screen.getByText(/Favorite Pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(FavoritePokemon).toBeInTheDocument();
  });

  test(`se a aplicação é redirecionada para a página inicial, na URL / 
  ao clicar no link Home da barra de navegação.`, () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const getLinkHome = screen.getByText(/Home/i);
    const getLinkAbout = screen.getByText(/About/i);
    const getLinkFavoritePokemon = screen.getByText(/Favorite Pokémons/i);

    userEvent.click(getLinkHome);
    const homeLink = screen.getByText(/Encountered pokémons/i);
    expect(homeLink).toBeInTheDocument();

    userEvent.click(getLinkAbout);
    const aboutLink = screen.getByText(/About Pokédex/i);
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(getLinkFavoritePokemon);
    const FavoritePokemonLink = screen.getByText(/No favorite pokemon found/i);
    expect(FavoritePokemonLink).toBeInTheDocument();
  });

  test(`se a aplicação é redirecionada para a página 
Not Found ao entrar em uma URL desconhecida.`, () => {
    render(
      <MemoryRouter initialEntries={ ['/asdasd'] }>
        <App />
      </MemoryRouter>,
    );

    const PagDesconhecida = screen.getByText(/Page requested not found/i);
    expect(PagDesconhecida).toBeInTheDocument();
  });
});
