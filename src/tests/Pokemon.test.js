import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa se renderiza um card com informações do pokemon', () => {
  test('Deveria exibir as informações do pokemon', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img');
    const sprite = screen.getByAltText(/sprite/i);

    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(/pikachu/i);
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent(/electric/i);
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent(/weight: 6.0 kg/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(sprite).toHaveAttribute('alt', 'Pikachu sprite');
  });
});

describe('Testa link Detalhes e suas funcionalidades', () => {
  test('Deveria exibir link para detalhes desde pokemon', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/details/i);
    expect(details).toBeInTheDocument();
  });
  test('Deveria redirecionar a pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByText(/details/i);
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
});

describe('Testa favoritos e suas funcionalidades', () => {
  test('Deveria existir estrela nos pokemons favoritados', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/details/i);
    userEvent.click(details);
    const checkBox = screen.getByRole('checkbox');
    userEvent.click(checkBox);
    const star = screen.getAllByRole('img')[1];
    const marked = screen.getByAltText(/marked as favorite/i);
    expect(marked).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
