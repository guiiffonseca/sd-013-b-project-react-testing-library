import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './Utils/utils';

const moreDetails = 'More details';
describe('Teste PokemonDetails', () => {
  test('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    renderWithRouter(
      <App />,
    );
    const pagrafoOne = 'This intelligent Pokémon roasts hard berries';
    const paragrafoTwo = 'with electricity to make them tender enough to eat.';
    const paragrafo = `${pagrafoOne} ${paragrafoTwo}`;
    const detailsLink = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(detailsLink);
    const namePokemon = screen.getByRole('heading', {
      name: `${pokemons[0].name} Details`,
      level: 2,
    });
    const summaryPokemon = screen.getByRole('heading', {
      name: /Summary/,
      level: 2,
    });
    const paragraphDetails = screen.queryByText(paragrafo);
    expect(namePokemon).toBeInTheDocument();
    expect(summaryPokemon).toBeInTheDocument();
    expect(paragraphDetails).toBeInTheDocument();
    expect(screen.queryByText(moreDetails)).toBeNull();
  });

  test('Teste se existe na página uma seção com os mapas do pokémon', () => {
    renderWithRouter(
      <App />,
    );
    const detailsLink = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(detailsLink);
    const headingPokemon = screen.getByRole('heading', {
      name: `Game Locations of ${pokemons[0].name}`,
      level: 2,
    });
    const imageOne = screen.getAllByAltText(`${pokemons[0].name} location`);

    expect(screen.queryByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(screen.queryByText('Kanto Power Plant')).toBeInTheDocument();
    expect(imageOne[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imageOne[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(headingPokemon).toBeInTheDocument();
  });
  test('Teste se o usuário pode favoritar um pokémon na página de detalhes', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(detailsLink);
    const checkboxFovorite = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(checkboxFovorite).toBeInTheDocument();
    userEvent.click(checkboxFovorite);
    const favoriteIcon = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoriteIcon).toBeInTheDocument();
    userEvent.click(checkboxFovorite);
    expect(favoriteIcon).not.toBeInTheDocument();
    userEvent.click(checkboxFovorite);
    const linkFavorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(linkFavorite);
    const pikachu = screen.getByTestId('pokemon-name');
    expect(pikachu).toBeInTheDocument();
  });
});
