import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import data from '../data';

describe('Requisito 7 - PokemonDetails.js tests', () => {
  it(`Ao entrar na página verifica se as informações detalhadas do Pokémon
   selecionado são mostradas na tela.`, () => {
    renderWithRouter(<App />);

    data.forEach((element, index) => {
      /* ENTRA NA PÁGINA DE DETALHE DO POKÉMON ATUAL */
      const detailsLink = screen.getByRole('link', { name: 'More details' });
      userEvent.click(detailsLink);

      /* VERIFICA SE A PÁGINA CONTÉM O TEXTO "<name> Details" ONDE O "<name>" É O NOME DO POKÉMON */
      const detailsText = screen.getByRole('heading', {
        level: 2,
        name: `${element.name} Details`,
      });
      expect(detailsText).toBeInTheDocument();

      /* VERIFICA SE A PÁGINA NÃO CONTÉM O LINK DE NAVEGAÇÃO PARA OS DETALHES DO POKÉMON SELECIONADO */
      expect(detailsLink).not.toBeInTheDocument();

      /* VERIFICA SE A PÁGINA CONTÉM UM "heading h2" COM O TEXTO "Summary" */
      const summaryText = screen.getByRole('heading', {
        level: 2,
        name: 'Summary',
      });
      expect(summaryText).toBeInTheDocument();

      /* VERIFICA SE A PÁGINA CONTÉM UM PARÁGRAFO COM O RESUMO DO POKÉMON ATUAL */
      const pokemonSummaryText = screen.getByText(element.summary);
      expect(pokemonSummaryText).toBeInTheDocument();

      /* VOLTA PARA HOME PAGE */
      const homeLink = screen.getByRole('link', { name: 'Home' });
      userEvent.click(homeLink);

      /* CLICA NO BOTÃO "Próximo pokémon" PARA VERIFICAÇÃO DO PROXIMO POKÉMON */
      for (let i = 0; i <= index; i += 1) {
        const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
        userEvent.click(buttonNextPokemon);
      }
    });
  });

  it(`Ao entrar na página verifica se se existe na página uma 
  seção com os mapas contendo as localizações do pokémon.`, () => {
    const { history } = renderWithRouter(<App />);
    data.forEach((element) => {
      /* ENTRA NA PÁGINA DE DETALHE DO POKÉQUEMO ATUAL */
      history.push(`/pokemons/${element.id}`);

      /* VERIFICA SE NA PÁGINA CONTÉM UM "heading h2" COM O TEXTO "Game Locations of <name>" ONDE "<name>" É O NOME DO POKÉMON */
      const locationText = screen.getByRole('heading', {
        level: 2,
        name: `Game Locations of ${element.name}`,
      });
      expect(locationText).toBeInTheDocument();

      for (let index = 0; index < element.foundAt.length; index += 1) {
        const mapLocation = screen.getAllByRole('img', {
          name: `${element.name} location`,
        });
        /* VERIFICA SE NA PÁGINA CONTÉM TODAS AS LOCALIZAÇÃO DO POKEMON ATUAL */
        expect(mapLocation[index]).toBeInTheDocument();

        /* VERIFICA SE TODOS MAPAS EXIBEM O NOME */
        const nameLocation = screen.getByText(element.foundAt[index].location);
        expect(nameLocation).toBeInTheDocument();

        /* VERIFICA SE A IMAGEM DA LOCALIZAÇÃO TEM O ATRIBUTO "src" COM A URL DO MAPA */
        expect(mapLocation[index]).toHaveAttribute('src', element.foundAt[index].map);

        /* VERIFICA SE A IMAGEM DA LOCALIZAÇÃO TEM O ATRIBUTO "alt" COM O TEXTO "<name> location" ONDE "<name>" É O NOME DO POKÉMON */
        expect(mapLocation[index]).toHaveAttribute('alt', `${element.name} location`);
      }
    });
  });

  it(`Ao entrar na página verifica se o usuário pode 
  favoritar um pokémon através da página de detalhes.`, () => {
    const { history } = renderWithRouter(<App />);

    data.forEach((element) => {
      /* ENTRA NA PÁGINA DE DETALHE DO POKÉQUEMO ATUAL */
      history.push(`/pokemons/${element.id}`);

      /* VERIFICA SE EXISTE UM CHECKBOX COM  A LABEL "Pokémon favoritado?" */
      const favoriteCheck = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
      expect(favoriteCheck).toBeInTheDocument();

      /* CLICA NA CHECKBOX PARA FAVORITAR O POKÉMON */
      userEvent.click(favoriteCheck);

      /* VERIFICA SE O POKÉMON FOI FAVORITADO */
      const starImage = screen.getByRole('img', {
        name: `${element.name} is marked as favorite` });
      expect(starImage).toBeInTheDocument();

      /* CLICA NA CHECKBOX PARA TIRAR O POKÉMON DOS FAVORITOS */
      userEvent.click(favoriteCheck);

      /* VERIFICA SE O POKÉMON NÃO É FAVORITO */
      expect(starImage).not.toBeInTheDocument();
    });
  });
});
