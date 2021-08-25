import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

const click = () => {
  const details = screen.getByText('More details');
  fireEvent.click(details);
};

describe('testando o componente Pokémon Details', () => {
  it(`página deve conter um texto <name> Details,
   onde <name> é o nome do Pokémon`, () => {
    renderWithRouter(<App />);
    click();
    const subtitle = screen.getByRole('heading', {
      name: 'Pikachu Details',
      level: 2,
    });
    expect(subtitle).toBeInTheDocument();
  });
  it(`Não deve existir o link de navegação para
   os detalhes do Pokémon selecionado`, () => {
    renderWithRouter(<App />);
    const details = screen.getByText('More details');
    fireEvent.click(details);
    expect(details).not.toBeInTheDocument();
  });
  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    renderWithRouter(<App />);
    click();
    const summary = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(summary).toBeInTheDocument();
  });
  it(`deve conter um parágrafo com o resumo do
   Pokémon específico sendo visualizado`, () => {
    renderWithRouter(<App />);
    const begin = 'This intelligent Pokémon roasts hard berries';
    const final = ' with electricity to make them tender enough to eat.';
    const complete = begin + final;
    click();
    const paragraph = screen.getByText(complete);
    expect(paragraph).toBeInTheDocument();
  });
  it('deverá existir um heading h2 com o texto Game Locations of <name>', () => {
    renderWithRouter(<App />);
    click();
    const locations = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    expect(locations).toBeInTheDocument();
  });
  it('devem ser exibidos, os nomes das localizações', () => {
    renderWithRouter(<App />);
    click();
    const paragraph2 = screen.getByText('Kanto Viridian Forest');
    expect(paragraph2).toBeInTheDocument();
    const paragraph3 = screen.getByText('Kanto Power Plant');
    expect(paragraph3).toBeInTheDocument();
  });
  it(`imagem da localização deve ter um atributo src com a URL
   da localização e um atributo alt com o texto <name> location`, () => {
    renderWithRouter(<App />);
    click();
    const size = 2;
    const images = screen.getAllByAltText('Pikachu location');
    expect(images.length).toBe(size);
    expect(images[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
  it('deve exibir um checkbox que permite favoritar o Pokémon', () => {
    renderWithRouter(<App />);
    click();
    const check = screen.getByLabelText('Pokémon favoritado?');
    expect(check).toBeInTheDocument();
  });
  test(`Cliques alternados no checkbox devem adicionar e remover
   respectivamente o Pokémon da lista de favoritos`, () => {
    renderWithRouter(<App />);
    click();
    const check = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(check);
    const favorite = screen.getByText('Pikachu');
    expect(favorite).toBeInTheDocument();
  });
});
