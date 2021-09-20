import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import { Pokemon } from '../components';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';

describe('Teste o componente <Pokemon.js />', () => {
  const showPokemon = data[0];
  renderWithRouter(<Pokemon pokemon={ showPokemon } isFavorite={ false } />);
  it('Exibe o nome do pokemon corretamente', () => {
    expect(screen.getByText(showPokemon.name)).toBeInTheDocument();
  });
  it('Exibe o tipo do pokemon corretamente', () => {
    renderWithRouter(<Pokemon pokemon={ showPokemon } isFavorite={ false } />);
    expect(screen.getByText(showPokemon.type)).toBeInTheDocument();
  });
  it('Exibe o peso do pokemon corretamente', () => {
    renderWithRouter(<Pokemon pokemon={ showPokemon } isFavorite={ false } />);
    const weightValue = showPokemon.averageWeight.value;
    const unitM = showPokemon.averageWeight.measurementUnit;
    const MSG_WEIGHT = `Average weight: ${weightValue} ${unitM}`;
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(MSG_WEIGHT);
  });
  it('Exibe o imagem do pokemon corretamente', () => {
    renderWithRouter(<Pokemon pokemon={ showPokemon } isFavorite={ false } />);
    const IMG_ALT = `${showPokemon.name} sprite`;
    const img = screen.getByAltText(IMG_ALT);
    expect(img).toHaveAttribute('src', showPokemon.image);
  });
  it('Possui link para detalhes', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ showPokemon } isFavorite={ false } />,
    );
    userEvent.click(screen.getByText(/More details/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${showPokemon.id}`);
  });
  it('Link para detalhes abre detalhes', () => {
    renderWithRouter(<Pokemon pokemon={ showPokemon } isFavorite={ false } />);
    userEvent.click(screen.getByText(/More details/i));
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(showPokemon.name);
  });
  it('Exibe icone de favorito', () => {
    const favorite = true;
    renderWithRouter(<Pokemon pokemon={ showPokemon } isFavorite={ favorite } />);
    const IMG_ALT_STAR = `${showPokemon.name} is marked as favorite`;
    const IMG_SRC_STAR = '/star-icon.svg';

    const star = screen.getByAltText(IMG_ALT_STAR);
    expect(star).toHaveAttribute('src', IMG_SRC_STAR);
  });
  // it('', () => {});
});
