import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

describe('Requisito 6', () => {
  test(`se é renderizado um card com as informações 
  de determinado pokémon.`, () => {
    render(
      <MemoryRouter initialEntries={ ['/pokemons/25'] }>
        <App />
      </MemoryRouter>,
    );
    const PokeInfo = pokemons[0];
    expect(screen.getByText(PokeInfo.name)).toBeInTheDocument();
    expect(screen.getByText(PokeInfo.type)).toBeInTheDocument();
    expect(screen.getByText(
      `Average weight: ${PokeInfo.averageWeight.value} ${
        PokeInfo.averageWeight.measurementUnit}`,
    )).toBeInTheDocument();

    expect(screen.getByRole('img', {
      name: `${PokeInfo.name} sprite`,
    })).toHaveAttribute('src', PokeInfo.image);
  });

  test('Teste se o card do pokemon indicado contém um link de nav', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkNav = screen.getByText(/More details/i);
    expect(linkNav).toBeInTheDocument();

    userEvent.click(linkNav);
    const check = screen.getByText(/Game Locations/i);
    expect(check).toBeInTheDocument();
  });

  test('se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    render(
      <MemoryRouter initialEntries={ ['/pokemons/4'] }>
        <App />
      </MemoryRouter>,
    );
    const getLabel = screen.getByLabelText(/Pokémon/i);
    expect(getLabel).toBeInTheDocument();
    userEvent.click(getLabel);

    const altImg = screen.getByAltText('Charmander is marked as favorite');
    expect(altImg).toBeInTheDocument();
    expect(altImg.src).toBe('http://localhost/star-icon.svg');
  });
});
