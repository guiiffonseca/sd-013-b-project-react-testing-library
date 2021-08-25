import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './util/renderWithRouter';
import App from '../App';
import data from '../data';

describe('tests the component Pokemon and its elements', () => {
  beforeEach(() => renderWithRouter(<App />));

  it('should render a card with pokemon informations', () => {
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const image = screen.getByAltText('Pikachu sprite');
    const link = data[0].image;
    expect(image.src).toStrictEqual(link);
  });

  it('should click on details and redirect to the pokemon details page', () => {
    const detailsButton = screen.getByRole('link', { name: 'More details' });
    expect(detailsButton).toHaveAttribute('href', expect.stringMatching(/pokemons/));
    /*
    solução discutida no zap. stringMatching para verificar o valor do atributo href.
    https://jestjs.io/pt-BR/docs/expect#expectstringmatchingstring--regexp
    */
  });

  it('shoul have a favorite star icon in favorite pokemons', () => {
    const detailsButton = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsButton);

    const favoriteButton = screen.getByRole('checkbox');
    userEvent.click(favoriteButton);

    const starIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
