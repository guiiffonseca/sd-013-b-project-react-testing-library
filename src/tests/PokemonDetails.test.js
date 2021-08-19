import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

const pikaRoute = '/pokemons/25';

describe('Testar o componente PokemonDetails.js', () => {
  test('Testar se os detalhes do Pokémon selecionado são mostradas na tela.', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toEqual(pikaRoute);

    const detailsText = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(detailsText).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();

    const summaryText = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summaryText).toBeInTheDocument();

    const pokeResume = screen.getByText(/this intelligent pokémon/i);
    expect(pokeResume).toBeInTheDocument();
  });

  test('Testar se existe uma seção com os mapas contendo as localizações', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toEqual(pikaRoute);

    const locations = screen.getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    });
    expect(locations).toBeInTheDocument();

    const gameMaps = screen.getAllByAltText('Pikachu location');
    expect(gameMaps.length).toEqual(2);
    expect(gameMaps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(gameMaps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const map1 = screen.getByText('Kanto Viridian Forest');
    const map2 = screen.getByText('Kanto Power Plant');
    expect(map1 && map2).toBeInTheDocument();
  });

  test('Testar se o usuário pode favoritar através da página de detalhes.', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toEqual(pikaRoute);

    const favorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado?/i,
    });
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const favoriteDefault = screen.getByAltText(
      'Pikachu is marked as favorite',
    );
    expect(favoriteDefault).toBeInTheDocument();
    expect(favoriteDefault).toHaveAttribute('src', '/star-icon.svg');
  });
});
