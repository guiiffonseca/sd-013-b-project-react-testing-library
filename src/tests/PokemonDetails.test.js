import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
  });
  test('Teste as informações detalhadas do Pokémon selecionado são mostradas.', () => {
    expect(screen
      .getByRole('heading', { name: /Pikachu Details/i, level: 2 })).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
    expect(screen
      .getByRole('heading', { name: /summary/i, level: 2 })).toBeInTheDocument();
  });
  test('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon ', () => {
    expect(screen
      .getByText(/This intelligent Pokémon roasts/i))
      .toBeInTheDocument();
  });
});
test('Não deve existir o link de navegação para os detalhes .', () => {
  renderWithRouter(<App />);
  const test = screen.getByRole('link', { name: /more details/i });
  userEvent.click(test);
  expect(test).not.toBeInTheDocument();
});

describe('Teste na página uma seção com os mapas tendo a localização do pokémon', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Na seção de detalhes deverá existir um heading h2 com o texto ', () => {
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(screen
      .getByRole('heading', { name: /Game Locations of Pikachu/i, level: 2 }))
      .toBeInTheDocument();
  });
  test('Todas as localização do Pokémon deve ser mostrada na seção de detalhes', () => {
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(screen
      .getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(screen
      .getByText('Kanto Power Plant')).toBeInTheDocument();
  });
  test('A imagem deve ter um atributo src com a URL da localização;', () => {
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(screen.getAllByAltText('Pikachu location')[0])
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('A imagemdeve ter um atributo alt com o texto nome do Pokémon location', () => {
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    const images = screen.getAllByAltText('Pikachu location');
    images.forEach((element) => expect(element).toBeInTheDocument());
  });
});

describe('Teste se pode favoritar um pokémon através da página de detalhes.', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
  });
  test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    expect(screen
      .getByRole('checkbox', { name: /Pokémon favoritado?/ })).toBeInTheDocument();
  });
  test('Cliques no checkbox devem adicionar e remover o Pokémon dos favoritos;', () => {
    userEvent.click(screen.getByRole('checkbox', { name: /Pokémon favoritado?/ }));
    expect(screen.getByRole('checkbox', { name: /Pokémon favoritado?/ })).toBeChecked();
    userEvent.click(screen.getByRole('checkbox', { name: /Pokémon favoritado?/ }));
    expect(screen
      .getByRole('checkbox', { name: /Pokémon favoritado?/ })).not.toBeChecked();
  });
  test('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    expect(screen
      .getByText('Pokémon favoritado?')).toHaveTextContent('Pokémon favoritado?');
  });
});
