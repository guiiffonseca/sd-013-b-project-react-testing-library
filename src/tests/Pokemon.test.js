import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../utils/renderWithRouter';

function getPokemonName() {
  return screen.getByTestId('pokemon-name');
}

function getPokemonType() {
  return screen.getByTestId('pokemon-type');
}

function getPokemonWeight() {
  return screen.getByTestId('pokemon-weight');
}

function getPokemonImg() {
  return screen.getByRole('img');
}

function getPokemonLinkDetail() {
  return screen.getByRole('link', {
    name: /more details/i,
  });
}

function getDetailPage() {
  return screen.getByRole('heading', {
    level: 2,
    name: `${getPokemonName().textContent} Details`,
  });
}

function getFavoriteCheckbox() {
  return screen.getByRole('checkbox');
}

function getStarFavorite() {
  return screen.queryByAltText(`${getPokemonName().textContent} is marked as favorite`);
}

function getPokemonSelected() {
  return pokemons.find((pokemon) => pokemon.name === getPokemonName().textContent);
}

describe('é renderizado um card com as informações de determinado pokémon.', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getPokemonName()).toHaveTextContent(pokemons[0].name);
  });

  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getPokemonType()).toHaveTextContent(pokemons[0].type);
  });

  test('Peso médio deve ser exibido Average weight: <value> <measurementUnit>', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const { value, measurementUnit } = pokemons[0].averageWeight;
    expect(getPokemonWeight())
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });

  test('A imagem do Pokémon deve ser exibida.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getPokemonImg()).toHaveAttribute('src', pokemons[0].image);
    expect(getPokemonImg()).toHaveAttribute('alt', `${pokemons[0].name} sprite`);
  });
});

describe('O card do Pokémon contém um link de navegação para exibir detalhes', () => {
  test(' O link deve possuir a URL /pokemons/<id>', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getPokemonLinkDetail())
      .toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
  });
});

describe('ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
  test('Página de detalhes', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    userEvent.click(getPokemonLinkDetail());
    expect(getDetailPage()).toBeInTheDocument();
  });
});

describe('a URL exibida no navegador muda para /pokemons/<id>', () => {
  test('Direcionamento', async () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(getPokemonLinkDetail());
    console.log(history.location.pathname);
    expect(history.location.pathname).toBe(`/pokemons/${getPokemonSelected().id}`);
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  test('O ícone deve ser uma imagem com o atributo src  /star-icon.svg;', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    userEvent.click(getPokemonLinkDetail());
    userEvent.click(getFavoriteCheckbox());
    expect(getStarFavorite()).toBeInTheDocument();
    expect(getStarFavorite()).toHaveAttribute('src', '/star-icon.svg');
  });

  test('Imagem deve ter o atributo alt: <pokemon> is marked as favorite', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    userEvent.click(getPokemonLinkDetail());
    expect(getStarFavorite()).toBeInTheDocument();
    expect(getStarFavorite())
      .toHaveAttribute('alt', `${getPokemonName().textContent} is marked as favorite`);
  });
});
