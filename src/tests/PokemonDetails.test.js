import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

function renderWithRouter(componentToRender) {
  const customHistory = createMemoryHistory();

  return {
    ...render(
      <Router history={ customHistory }>
        {componentToRender}
      </Router>,
    ),
    history: customHistory,
  };
}

describe('Teste o componente <PokemonDetails.js />', () => {
  it('detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(btnDetails);
    const componentDetails = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu Detail/i,
    });
    expect(componentDetails).toBeInTheDocument();
  });

  it('uma seção com os mapas contendo as localizações do pokémo', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(btnDetails);
    const imgMap = screen.getAllByRole('img', { name: /Pikachu location/i })[0];
    expect(imgMap.src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgMap.alt).toBe('Pikachu location');

    const componentLocation = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations/i,
    });
    expect(componentLocation).toBeInTheDocument();

    const componentGame = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(componentGame).toBeInTheDocument();

    const componentSumary = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(componentSumary).toBeInTheDocument();

    const sumaryParagraph = screen.getByText(/This intelligent Pokémon/i);
    expect(sumaryParagraph).toBeInTheDocument();
  });

  it('usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(btnDetails);
    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favorite).toBeInTheDocument();
  });
});
