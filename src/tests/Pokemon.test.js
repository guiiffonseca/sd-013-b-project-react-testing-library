import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Pokemon } from '../components';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente Pokemon.js', () => {
  const pokemon = pokemons[0];
  const {
    id,
    name,
    type,
    image,
    averageWeight: { value, measurementUnit },
  } = pokemon;

  const setup = (favorite) => {
    render(
      <MemoryRouter>
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ favorite }
        />
      </MemoryRouter>,
    );
  };

  test('Deve renderizar um card com as informações do pokemon', () => {
    setup();

    const pokeName = screen.getByTestId('pokemon-name').textContent;
    const pokeType = screen.getByTestId('pokemon-type').textContent;
    const pokeWeight = screen.getByTestId('pokemon-weight').textContent;
    const pokeImg = screen.getByAltText(`${name} sprite`);

    expect(pokeName).toMatch(name);
    expect(pokeType).toMatch(type);
    expect(pokeWeight).toMatch(`Average weight: ${value} ${measurementUnit}`);
    expect(pokeImg).toHaveAttribute('src', image);
  });

  test('Deve possuir um link para navegação aos detalhes do Pokémon ', () => {
    setup();

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(detailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test('Deve redirecionar para a página de detalhes do Pokémon ao clicar no link', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);

    const url = history.location.pathname;
    expect(url).toMatch(`/pokemons/${id}`);

    const title = screen.getByText(`${name} Details`);
    expect(title).toBeInTheDocument();
  });

  test('Deve haver um ícone de estrela nos pokémons favoritados', () => {
    setup(true);
    const star = screen.getByAltText(`${name} is marked as favorite`);

    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });

});
