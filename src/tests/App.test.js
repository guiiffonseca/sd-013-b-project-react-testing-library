import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Requisito 1', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  
    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const FavoritePokemon = getByText(/Favorite Pokémons/i);
  
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(FavoritePokemon).toBeInTheDocument();
  });

  test('se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  
    const getLinkHome = getByText(/Home/i);
    const getLinkAbout = getByText(/About/i);
    const getLinkFavoritePokemon = getByText(/Favorite Pokémons/i);
  
  
    userEvent.click(getLinkHome);
    const homeLink = getByText(/Encountered pokémons/i);
    expect(homeLink).toBeInTheDocument();
  
    userEvent.click(getLinkAbout);
    const aboutLink = getByText(/About Pokédex/i);
    expect(aboutLink).toBeInTheDocument();
  
    userEvent.click(getLinkFavoritePokemon);
    const FavoritePokemonLink = getByText(/No favorite pokemon found/i);
    expect(FavoritePokemonLink).toBeInTheDocument();
  });
  
  
  test('se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.',
   () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/asdasd'] }>
        <App />
      </MemoryRouter>
    );
  
    const PagDesconhecida = getByText(/Page requested not found/i);
    expect(PagDesconhecida).toBeInTheDocument();
  });
})
