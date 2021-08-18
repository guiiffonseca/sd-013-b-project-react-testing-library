import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  test('verifica se as informações são mostradas na tela', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const detailsLink = screen.getByRole('link', {
      name: /details/,
    });
    userEvent.click(detailsLink);

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(screen.getByRole('heading', {
      level: 2,
      name: /Summary/,
    }));
    expect(screen.getByText(
      /Pokémon roasts hard berries with electricity to make them tender enough to eat./,
    ));
  });

  test('verifica se existem mapas na tela', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const nextPokeButton = screen.getByRole('button', {
      name: /Próximo pokémon/,
    });
    userEvent.click(nextPokeButton);
    userEvent.click(nextPokeButton);
    userEvent.click(nextPokeButton);
    const detailsLink = screen.getByRole('link', {
      name: /details/,
    });
    userEvent.click(detailsLink);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Ekans/,
    }));

    const map = screen.getByText('Goldenrod Game Corner');
    const mapImg = screen.getByAltText('Ekans location');
    expect(map).toBeInTheDocument();
    expect(mapImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');
    expect(mapImg).toBeInTheDocument();
  });

  test('verifica se as informações são mostradas na tela', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const detailsLink = screen.getByRole('link', {
      name: /details/,
    });
    userEvent.click(detailsLink);

    const favoriteButton = screen.getByRole('checkbox', {
      name: /Pokémon favoritado?/,
    });
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);
    const favoriteLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoriteLink);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
