import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const linkToPush = '/pokemons/25';

describe('Teste o componente <PokemonDetails.js />', () => {
  const testLabel1 = 'Teste se as informações detalhadas'
  + 'do Pokémon selecionado são mostradas na tela.';
  describe(testLabel1, () => {
    test('A página deve conter um texto <name> Details', () => {
      const { history } = renderWithRouter(<App />);
      history.push(linkToPush);
      const pokemonName = screen.getByRole('heading', {
        level: 2,
        name: 'Pikachu Details',
      });
      expect(pokemonName).toBeInTheDocument();
    });
    const testLabel2 = 'Não deve existir o link de'
    + 'navegação para os detalhes do Pokémon selecionado.';
    test(testLabel2, () => {
      const { history } = renderWithRouter(<App />);
      history.push(linkToPush);
      const numberOfLinks = 3;
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(numberOfLinks);
      // Só devem existir 3 links, o home, about e favorite pokémons
    });
    test('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
      const { history } = renderWithRouter(<App />);
      history.push(linkToPush);
      const summaryHeading = screen.getByRole('heading', {
        level: 2,
        name: 'Summary',
      });
      expect(summaryHeading).toBeInTheDocument();
    });
    const testLabel3 = 'A seção de detalhes deve conter um'
    + 'parágrafo com o resumo do Pokémon específico sendo visualizado.';
    test(testLabel3, () => {
      const { history } = renderWithRouter(<App />);
      history.push(linkToPush);
      const summaryContent = 'This intelligent Pokémon roasts hard berries'
      + ' with electricity to make them tender enough to eat.';
      expect(screen.getByText(summaryContent)).toBeInTheDocument();
    });
  });
  const testLabel4 = 'Teste se existe na página uma'
  + ' seção com os mapas contendo as localizações do pokémon';
  describe(testLabel4, () => {
    const testLabel5 = 'Na seção de detalhes deverá'
    + 'existir um heading h2 com o texto Game Locations of <name>';
    test(testLabel5, () => {
      const { history } = renderWithRouter(<App />);
      history.push(linkToPush);
      expect(screen.getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' }))
        .toBeInTheDocument();
    });
    test('Todas as localizações do Pokémon devem ser mostradas', () => {
      const { history } = renderWithRouter(<App />);
      history.push(linkToPush);
      const allGameLocations = screen.getAllByAltText('Pikachu location');
      expect(allGameLocations).toHaveLength(2);
      expect(allGameLocations[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(allGameLocations[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
      expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();
      expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
    });
    const testLabel6 = 'Teste se o usuário pode favoritar'
    + 'um pokémon através da página de detalhes.';
    describe(testLabel6, () => {
      test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
        const { history } = renderWithRouter(<App />);
        history.push(linkToPush);
        const favoriteCheckbox = screen.getByRole('checkbox', {
          name: 'Pokémon favoritado?' });
        expect(favoriteCheckbox).toBeInTheDocument();
        fireEvent.click(favoriteCheckbox);
        const favStar = screen.getByAltText('Pikachu is marked as favorite');
        expect(favStar).toBeInTheDocument();
        fireEvent.click(favoriteCheckbox);
        expect(favStar).not.toBeInTheDocument();
      });
    });
  });
});
