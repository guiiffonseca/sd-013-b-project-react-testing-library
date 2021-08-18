import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testar o componente FavoritePokemons', () => {
  test('Testar se a mensagem No favorite pokemon found é renderizada', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    const notFound = screen.getByText(/no favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  test('Testar se é exibido todos os cards de pokémons favoritados.', () => {
    const pokemons = [
      {
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
      },
    ]; // copiado do arquivo data.js
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />); // no arquivo do componente percebi que o mesmo recebe como props um objeto pokemon que vai ser renderizado como um card.

    const pokeName = screen.getByTestId('pokemon-name'); // ao inspecionar o card na pagina, cada 'p' criado tem um data testid.
    expect(pokeName.textContent).toEqual('Charmander'); // inspirado em https://stackoverflow.com/questions/55509875/how-to-query-by-text-string-which-contains-html-tags-using-react-testing-library.
    expect(pokeName).toBeInTheDocument();

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType.textContent).toEqual('Fire');
    expect(pokeType).toBeInTheDocument();

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight.textContent).toEqual('Average weight: 8.5 kg');
    expect(pokeWeight).toBeInTheDocument();
  });
});
