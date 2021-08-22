import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import App from '../App';

function renderWithRouter(component) {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
}

const pathName = '/pokemons/25';

test('As informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
  const { history } = renderWithRouter(<App />);
  history.push(pathName);
  expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
  /* ref: https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing */
  const detailsLink = screen.queryByText('More details');
  expect(detailsLink).toBeNull();
  expect(screen.getByRole('heading', { name: 'Summary', level: 2 }));
  const descriptionO = 'This intelligent Pokémon roasts hard berries with ';
  const descriptionT = `${descriptionO}electricity to make them tender enough to eat.`;
  expect(screen.getByText(descriptionT)).toBeInTheDocument();
});

test('Na página existe uma seção com os mapas contendo as localizações do pokémon.',
  () => {
    const { history } = renderWithRouter(<App />);
    history.push(pathName);
    expect(screen.getByRole('heading',
      { name: 'Game Locations of Pikachu', level: 2 })).toBeInTheDocument();
    const locations = screen.getAllByAltText('Pikachu location');
    expect(locations.length).toBe(2);
    const locationOneUrl = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    expect(locations[0]).toHaveAttribute('src', locationOneUrl);
    const locationTwoUrl = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(locations[1]).toHaveAttribute('src', locationTwoUrl);
    expect(screen
      .getByRole('heading', { name: 'Pikachu Details', level: 2 })).toBeInTheDocument();
  });

test(' O usuário consegue favoritar um pokémon através da página de detalhes.', () => {
  const { history } = renderWithRouter(<App />);
  history.push(pathName);
  expect(screen.getByLabelText(/pokémon favoritado/i)).toBeInTheDocument();
  expect(screen.getByRole('checkbox')).toBeInTheDocument();
});
