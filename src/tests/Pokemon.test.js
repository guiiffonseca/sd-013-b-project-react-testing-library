import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente Pokémon.js', () => {
  const POKEMON_NAME = 'pokemon-name';
  const POKEMON_TYPE = 'pokemon-type';
  const POKEMON_WEIGHT = 'pokemon-weight';

  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const value = '6.0';
  const measurementUnit = 'kg';
  const PIKACHU = 'Pikachu';

  const pokemonId = ['4', '10', '23', '65', '151', '78', '143', '148', '25'];

  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    expect(screen.getByTestId(POKEMON_NAME).innerHTML).toBe(PIKACHU);
    expect(screen.getByTestId(POKEMON_TYPE).innerHTML).toBe('Electric');
    expect(screen.getByTestId(POKEMON_WEIGHT)).toHaveTextContent(`${value} ${measurementUnit}`);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(screen.getByRole('img')).toHaveAttribute('alt', `${PIKACHU} sprite`);
  });

  test('Teste se o card do Pokémon indicado tem um link para exibir detalhes', () => {
    pokemonId.forEach((element) => {
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
      expect(screen
        .getByRole('link', { name: /more details/i }))
        .toHaveAttribute('href', `/pokemons/${element}`);
    });
  });

  test('Teste se clicar no link de detalhles, é redirecionamento para detalhes', () => {
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(screen
      .getByRole('heading', { level: 2, name: /Details/i }).innerHTML)
      .toBe('Pikachu Details');
  });
});
describe('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
  test('teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado/i }));
    expect(screen.getByAltText(/Pikachu is marked as favorite/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Pikachu is marked as favorite/i))
      .toHaveAttribute('src', '/star-icon.svg');
  });
});
