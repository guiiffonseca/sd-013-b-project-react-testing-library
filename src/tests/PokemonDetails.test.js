import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import RouterMemory from './RouterMemory';
import App from '../App';

// logica consultada de Henrique Remedios https://github.com/tryber/sd-013-b-project-react-testing-library/tree/henrique-remedios-project-react-testing-library;
describe('Requisito PokemonDetails test', () => {
  test('Verifique informações detalhadas do Pokémon selecionado', () => {
    const { history } = RouterMemory(<App />);
    const linkDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(linkDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    expect(linkDetails).not.toBeInTheDocument();
  });

  test('Verifique informações na tela  e se contem mapas com localização', () => {
    RouterMemory(<App />);
    const detailsLink = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(detailsLink);

    const title = screen.getByRole('heading', { name: /pIKACHU dETAILS/i });
    expect(title).toBeInTheDocument();

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent(/Pikachu/i);

    const infoPokemon = screen.getByText(/This intelligent Pokémon/i);
    expect(infoPokemon).toBeDefined();

    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();

    const locationTitle = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i });
    expect(locationTitle).toBeInTheDocument();

    RouterMemory(<App />);
    const map = screen.getAllByAltText(/pikachu location/i);
    expect(map).toHaveLength(2);

    const mapLeft = screen.getByText(/Kanto Viridian Forest/i);
    expect(map[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapLeft).toBeInTheDocument();

    const mapRight = screen.getByText(/Kanto Power Plant/i);
    expect(map[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(mapRight).toBeInTheDocument();
  });

  test('Verifique se o usuário pode favoritar um pokemon', () => {
    RouterMemory(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const favorite = screen.getByLabelText(/pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkbox);

    const favoritePokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritePokemon).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(checkbox).toBeInTheDocument();
  });
});

// neste ultimo requisito consegui termina-lo por meio de consulta ao repositorio do Henrique Remedios https://github.com/tryber/sd-013-b-project-react-testing-library/tree/henrique-remedios-project-react-testing-library;
