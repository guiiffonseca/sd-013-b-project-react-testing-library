import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste se as info detalhadas do Pokémon selecionado são mostradas', () => {
  test('se a página deve conter um texto <name> Details', () => {
    const { history } = renderWithRouter(<App />);
    pokemons.forEach(({ id, name }) => {
      history.push(`/pokemons/${id}`);

      const pokemonsNameDetails = screen.getByRole('heading', {
        level: 2,
        name: `${name} Details`,
      });
      expect(pokemonsNameDetails).toBeInTheDocument();
    });
  });

  test('se não existe link de navegação para os detalhes do Pokémon selecionado', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });

    pokemons.forEach(({ id }) => {
      history.push(`/pokemons/${id}`);

      expect(detailsLink).not.toBeInTheDocument();
    });
  });

  test('se a seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { history } = renderWithRouter(<App />);

    pokemons.forEach(({ id }) => {
      history.push(`/pokemons/${id}`);

      const h2Summary = screen.getByRole('heading', {
        level: 2,
        name: 'Summary',
      });
      expect(h2Summary).toBeInTheDocument();
    });
  });

  test('se a seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    pokemons.forEach(({ id, summary }) => {
      history.push(`/pokemons/${id}`);

      const pokemonSummary = screen.getByText(summary);

      expect(pokemonSummary).toBeInTheDocument();
    });
  });
});

describe('Teste se existe na página uma seção com os mapas dos pokémon', () => {
  test('se na seção de detalhes tem um h2 com o texto Game Locations of <name>', () => {
    const { history } = renderWithRouter(<App />);

    pokemons.forEach(({ id, name }) => {
      history.push(`/pokemons/${id}`);

      const gameLocationsNameText = screen.getByRole('heading', {
        level: 2,
        name: `Game Locations of ${name}`,
      });
      expect(gameLocationsNameText).toBeInTheDocument();
    });
  });

  test('se todas as localizações do Pokémon são mostradas na seção de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    pokemons.forEach(({ id, name, foundAt }) => {
      history.push(`/pokemons/${id}`);

      foundAt.forEach(({ location, map }, index) => {
        const pokemonLocation = screen.getByText(location);
        const pokemonMap = screen.getAllByAltText(`${name} location`);

        expect(pokemonMap[index].src).toBe(map);
        expect(pokemonLocation).toBeInTheDocument();
      });
    });
  });
});

describe('Teste se o usuário pode favoritar um pokémon', () => {
  test('se a página exibe um checkbox que permite favoritar o Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    pokemons.forEach(({ id }) => {
      history.push(`/pokemons/${id}`);

      const checkboxFavoritePokemon = screen.getByLabelText('Pokémon favoritado?', {
        selector: 'input',
      });

      expect(checkboxFavoritePokemon).toBeInTheDocument();

      const checkbox = screen.getByRole('checkbox', {
        name: 'Pokémon favoritado?',
      });
      expect(checkbox).toBeInTheDocument();
    });
  });
});
