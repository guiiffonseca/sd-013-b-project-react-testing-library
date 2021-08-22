import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

function renderWithRoute(component) {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
}

test('Teste se é renderizado um card com as informações de determinado pokémon.',
  () => {
    const { history } = renderWithRoute(<App />);
    history.push('/');
    expect(history.location.pathname).toBe('/');
    const pokeImageUrl = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent('Average weight: 6.0 kg');
    const pokeDetailsLink = screen.getAllByRole('img')[0];
    expect(pokeDetailsLink)
      .toHaveAttribute('src', pokeImageUrl);
  });

test('O card do Pokémon contém um link de navegação para detalhes deste Pokémon.',
  () => {
    const { history } = renderWithRoute(<App />);
    history.push('/');
    expect(screen.getByRole('link', { name: 'More details' }))
      .toBeInTheDocument();
  });

test('A URL exibida no navegador muda quando o link do pokemon é recebe um click.',
  () => {
    const { history } = renderWithRoute(<App />);
    history.push('/');
    const detailsLink = screen.getAllByRole('link')[3];
    userEvent.click(detailsLink);
    const currentPath = history.location.pathname;
    expect(currentPath).toBe('/pokemons/25');
    const imageTest = screen.getAllByRole('img')[0];
    expect(imageTest).toHaveAttribute('alt', 'Pikachu sprite');
  });

test('Deve existir um ícone de estrela nos Pokémons favoritados', () => {
  const { history } = renderWithRoute(<App />);
  history.push('/pokemons/25');
  const favInput = screen.getByRole('checkbox');
  expect(favInput).toBeInTheDocument();
  userEvent.click(favInput);
  const pokeImageAlt = 'Pikachu is marked as favorite';
  expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', pokeImageAlt);
  expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', '/star-icon.svg');
});
