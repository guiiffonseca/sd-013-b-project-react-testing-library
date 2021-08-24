import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa  rederização de informações ligadas aos pokemons', () => {
  const pokeTest = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: 1000,
      measurementUnit: 'pokePesos',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    summary:
    `This intelligent Pokémon roasts hard berries with electricityto make
     them tender enough to eat.`,
  };
  const { averageWeight } = pokeTest;

  it('deve rederizar card com informações de um pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ pokeTest } isFavorite={ { 25: false } } />);
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImage = screen.getByAltText(`${pokeTest.name} sprite`);

    expect(pokeName.textContent).toBe(pokeTest.name);
    expect(pokeType.textContent).toBe(pokeTest.type);
    expect(pokeWeight.textContent).toBe(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );
    expect(pokeImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('deve renderizar um link de mais detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    // utiliza o matcher .toMatch
    const linkTest = new RegExp('.*/pokemons/25');

    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toMatch(linkTest);
    fireEvent.click(detailsLink);

    const { pathname } = history.location;
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });

    expect(title).toBeInTheDocument();
    expect(pathname).toBe('/pokemons/25');
  });

  it('deve conter um icone de estrela nos pokemons favoritados', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(detailsLink);
    const favoriteCheck = screen.getByText(/favoritado/i);
    fireEvent.click(favoriteCheck);
    const favoriteButton = screen.getByText(/favorite/i);
    fireEvent.click(favoriteButton);
    const favoriteStar = screen.getByAltText(/ is marked as favorite/i);
    const starRegex = new RegExp('star-icon.svg');

    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar.src).toMatch(starRegex);
  });
});
