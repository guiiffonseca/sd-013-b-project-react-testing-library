import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './router/renderWithRouter';
import App from '../App';

const POKEMON_LINK = '/pokemons/25';

describe('Testa o componente Pokemon', () => {
  test('verifica se é renderizado um card com as informações do pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
    expect(screen.getAllByText('Electric')[0]).toBeInTheDocument();
    expect(screen.getByText(/Average weight/)).toBeInTheDocument();
    expect(screen.getByAltText('Pikachu sprite')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('verifica se há um link com id do pokemon',
    () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByText(/More details/);
      expect(moreDetailsLink).toHaveAttribute('href', POKEMON_LINK);
    });

  test('verifica se o link redireciona para a página correta',
    () => {
      const { history } = renderWithRouter(<App />);
      const moreDetailsLink = screen.getByText('More details');
      expect(moreDetailsLink).toHaveAttribute('href', POKEMON_LINK);
      userEvent.click(moreDetailsLink);
      history.push(POKEMON_LINK);
      expect(screen.getByRole('heading', {
        level: 2,
        name: /Summary/,
      }));
      const { location: { pathname } } = history;
      expect(pathname).toBe(POKEMON_LINK);
    });

  test('verifica se há uma estrela no pokemon favoritado', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetailsLink = screen.getByText('More details');
    userEvent.click(moreDetailsLink);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /Summary/,
    }));

    const favoriteButton = screen.getByRole('checkbox', {
      checked: false,
    });
    userEvent.click(favoriteButton);

    const starImage = screen.getByAltText('Pikachu is marked as favorite');
    expect(starImage).toBeInTheDocument();
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
