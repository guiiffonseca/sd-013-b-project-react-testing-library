import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import App from '../App';
// import renderWithRouter from '../utils/renderWithRouter';
import pokemons from '../data';

function getNamePokemonSelected() {
  return screen.getByTestId('pokemon-name').textContent;
}

function getPokemonSelected() {
  return pokemons.find((pokemon) => pokemon.name === getNamePokemonSelected());
}

function getPokemonLinkDetail() {
  return screen.queryByRole('link', {
    name: /more details/i,
  });
}

function getNameDetail() {
  return screen.getByRole('heading', {
    level: 2,
    name: `${getNamePokemonSelected()} Details`,
  });
}

function getH2Summary() {
  return screen.getByRole('heading', {
    level: 2,
    name: 'Summary',
  });
}

function getH2GameLocations() {
  return screen.getByRole('heading', {
    level: 2,
    name: `Game Locations of ${getNamePokemonSelected()}`,
  });
}

function getPkemonSummary() {
  const { summary } = pokemons.find((pokemon) => pokemon.id === getPokemonSelected().id);
  return screen.getByText(summary);
}

function getAllLocations() {
  return screen.queryAllByAltText(`${getNamePokemonSelected()} location`);
}

function getFavoriteCheckbox() {
  return screen.getByRole('checkbox');
}

function getLabelFavoriteCheckbox() {
  return screen.getByLabelText('Pokémon favoritado?');
}

function getStarFavorite() {
  return screen.queryByAltText(`${getNamePokemonSelected()} is marked as favorite`);
}

describe('Informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  test('página deve conter um texto <name> Details do Pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getPokemonLinkDetail()).toBeInTheDocument();
    userEvent.click(getPokemonLinkDetail());
    expect(getNameDetail()).toBeInTheDocument();
  });

  test('Não deve existir o link de navegação para o Pokémon selecionado.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    userEvent.click(getPokemonLinkDetail());
    expect(getPokemonLinkDetail()).not.toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    userEvent.click(getPokemonLinkDetail());
    expect(getH2Summary()).toBeInTheDocument();
  });

  test('deve conter um parágrafo com o resumo do Pokémon específico', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    userEvent.click(getPokemonLinkDetail());
    expect(getPkemonSummary()).toBeInTheDocument();
  });
});

describe('Existe na página uma seção com os mapas contendo as localizações', () => {
  test('existir um heading h2 com o texto Game Locations of <name>.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getPokemonLinkDetail()).toBeInTheDocument();
    userEvent.click(getPokemonLinkDetail());
    expect(getH2GameLocations()).toBeInTheDocument();
  });

  test('Todas as localizações do Pokémon devem ser mostradas', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getPokemonLinkDetail()).toBeInTheDocument();
    userEvent.click(getPokemonLinkDetail());
    expect(getAllLocations().length).toBe(getPokemonSelected().foundAt.length);
  });

  test('exibidos, o nome da localização e uma imagem do mapa', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getPokemonLinkDetail()).toBeInTheDocument();
    userEvent.click(getPokemonLinkDetail());
    for (let index = 0; index < getAllLocations().length; index += 1) {
      expect(getAllLocations()[index])
        .toHaveAttribute('src', getPokemonSelected().foundAt[index].map);
    }
  });
});

describe('o usuário pode favoritar um pokémon através da página de detalhes.', () => {
  test('A página deve exibir um checkbox que permite favoritar o Pokémon;', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getPokemonLinkDetail()).toBeInTheDocument();
    userEvent.click(getPokemonLinkDetail());
    expect(getFavoriteCheckbox()).toBeInTheDocument();
  });

  test('adicionar e remover o Pokémon da lista de favoritos;', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getPokemonLinkDetail()).toBeInTheDocument();
    userEvent.click(getPokemonLinkDetail());
    userEvent.click(getFavoriteCheckbox());
    expect(getStarFavorite()).toBeInTheDocument();
    userEvent.click(getFavoriteCheckbox());
    expect(getStarFavorite()).not.toBeInTheDocument();
  });

  test('O label do checkbox deve conter o texto Pokémon favoritado?;', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getPokemonLinkDetail()).toBeInTheDocument();
    userEvent.click(getPokemonLinkDetail());
    expect(getLabelFavoriteCheckbox()).toBeInTheDocument();
  });
});
