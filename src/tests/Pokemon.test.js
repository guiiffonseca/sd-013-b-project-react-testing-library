import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
// import pokemons from '../data';
import App from '../App';

describe('Teste o componente Pokemon', () => {
  test('Se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokeType = screen.getByTestId('pokemon-type');
    const pikachuName = screen.getAllByText(/Pikachu/)[0];
    const pikachuWeight = screen.getByText(/Average weight: 6.0 kg/);
    const pokeimg = screen.getByRole('img');
    expect(pokeType).toHaveTextContent('Electric');
    expect(pokeimg).toBeInTheDocument();
    expect(pokeimg).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pokeimg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pikachuWeight).toBeInTheDocument();
    expect(pikachuName).toBeInTheDocument();
  });
  test('Se o card do Pokémon contém um link para exibir detalhes do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByText(/More details/);
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/More details/);
    fireEvent.click(moreDetails);
    const favPoke = screen.getByText(/Pokémon favoritado?/);
    fireEvent.click(favPoke);
    const star = screen.getByRole('img', { name: /Pikachu is marked as favorite/ });
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
  test('', () => {});
  test('', () => {});
});
