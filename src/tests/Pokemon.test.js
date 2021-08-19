import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  test('verifica se é renderizado um card com as informações do pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getAllByText('Electric')[0]).toBeInTheDocument();
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();
    expect(screen.getByAltText('Pikachu sprite')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('verifica se há link com id do pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetailsLink = screen.getByText('More details');
    expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  test('verifica se o link redireciona para a página correta', () => {
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

    const starImage = screen.getByAltText('Pikachu is marked as favorite')
    expect(starImage).toBeInTheDocument();
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
