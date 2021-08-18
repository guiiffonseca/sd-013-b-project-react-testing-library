import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

const name = 'pokemon-name';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading',
      {
        name: 'Encountered pokémons',
        level: 2,
      });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const buttonProximo = screen.getByTestId('next-pokemon');
    expect(buttonProximo).toHaveTextContent('Próximo pokémon');
    userEvent.click(buttonProximo);
    const namePokemon = screen.getByTestId(name);
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(namePokemon).toHaveTextContent('Charmander');
    expect(typePokemon).toHaveTextContent('Fire');
  });

  test(
    'Teste se é Mostrado na tela o pokemon Ekans assim que clicamos no type poison',
    () => {
      renderWithRouter(<App />);
      const buttonType = screen.getAllByTestId('pokemon-type-button');
      expect(buttonType[3]).toHaveTextContent('Poison');
      userEvent.click(buttonType[3]);
      const namePokemon = screen.getByTestId(name);
      const typePokemon = screen.getByTestId('pokemon-type');
      expect(namePokemon).toHaveTextContent('Ekans');
      expect(typePokemon).toHaveTextContent('Poison');
    },
  );

  test('Testa se quando clicamos no All exibe mais de um tipo de pokemon', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /All/i });
    const nextPokemon = screen.getByRole('button', { name: /Próximo/i });
    expect(buttonAll).toHaveTextContent('All');
    userEvent.click(buttonAll);
    let namePokemon = screen.getByTestId(name);
    expect(namePokemon).toHaveTextContent('Pikachu');
    userEvent.click(nextPokemon);
    namePokemon = screen.getByTestId(name);
    expect(namePokemon).toHaveTextContent('Charmander');
  });
});
