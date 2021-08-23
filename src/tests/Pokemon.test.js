import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import data from '../data';

describe('Requisito 6 - Pokemon.js tests', () => {
  const details = 'More details';
  const nextPokemon = 'Próximo pokémon';

  it(`Ao entrar na página verifica se é renderizado 
  um card com as informações de determinado pokémon.`, () => {
    renderWithRouter(<App />);

    data.forEach((element) => {
      /* VERIFICA SE O NOME CORRETO DO POKÉMON É EXIBIDO NA TELA */
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(element.name);

      /* VERIFICA SE O TIPO CORRETO DO POKÉMON É EXIBIDO MA TELA */
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(element.type);

      /* VERIFICA SE O PESO MÉDIO DO POKÉMON É EXIBIDO NA TELA COM O FORMATO
      "Average weight: <value> <measurementUnit>" ONDE "<value>" E "<measurementUnit>"
      SÃO, RESPECTIVAMENTE, O PESO MÉDIO DO POKÉMON E SUA UNIDADE DE MEDIDA.  */
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const { value } = element.averageWeight;
      const { measurementUnit } = element.averageWeight;
      expect(pokemonWeight)
        .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

      /* VERIFICA SE A IMAGEM DO POKEMON É EXIBIDA CONTENDO O ATRIBUTO "src" COM
      A "URL" DA IMAGEM E UM ATRIBUTO "alt" COM O TEXTO "<name> sprite" ONDE "<name>" É O NOME DO POKÉMON */
      const pokemonIMG = screen.getByRole('img');
      expect(pokemonIMG).toHaveAttribute('src', element.image);
      expect(pokemonIMG).toHaveAttribute('alt', `${element.name} sprite`);

      /* CLICA NO BOTÃO PARA TESTAR O PROXIMO CARD */
      const buttonNext = screen.getByRole('button', { name: nextPokemon });
      userEvent.click(buttonNext);
    });
  });

  it(`Ao entrar na página verifica se o card do Pokémon indicado na Pokédex 
  contém um link de navegação para exibir detalhes deste Pokémon. 
  O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;`, () => {
    renderWithRouter(<App />);
    data.forEach((element) => {
      const detailsLink = screen.getByRole('link', {
        name: details,
      });
      expect(detailsLink).toHaveAttribute('href', `/pokemons/${element.id}`);

      const buttonNext = screen.getByRole('button', { name: nextPokemon });
      userEvent.click(buttonNext);
    });
  });

  it(`Ao entrar na página verifica se ao clicar no link de navegação do Pokémon, 
  é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    const { history } = renderWithRouter(<App />);

    data.forEach((element, index) => {
      /* VERIFICA SE AO CLICAR NO LINK DE DETALHES É FEITO O REDIRECIONAMENTO PARA PÁGINA DE DETALHES DO POKÉMON */
      const detailsLink = screen.getByRole('link', {
        name: details,
      });
      userEvent.click(detailsLink);
      const pokemonDetails = screen.getByRole('heading', {
        level: 2,
        name: `${element.name} Details`,
      });
      expect(pokemonDetails).toBeInTheDocument();

      /* VERIFICA SE A "URL" EXIBIDA NO NAVEGADOR MUDA PARA "/pokemon/<id>" ONDE "<id>"
      É O ID DO POKÉMON CUJOS DETALHES SE DESEJA VER */
      expect(history.location.pathname).toBe(`/pokemons/${element.id}`);

      /* CLICA NO LINK "Home" PARA VOLTAR A PÁGINA INICIAL */
      const linkHome = screen.getByRole('link', { name: 'Home' });
      userEvent.click(linkHome);

      /* CLICA NO BOTÃO "Próximo pokémon" PARA TESTAR O PRÓXIMO POKÉMON */
      for (let i = 0; i <= index; i += 1) {
        const buttonNext = screen.getByRole('button', { name: nextPokemon });
        userEvent.click(buttonNext);
      }
    });
  });

  it(`Ao entrar na página verifica se existe um ícone de
   estrela nos Pokémons favoritados.`, () => {
    renderWithRouter(<App />);
    data.forEach((element, index) => {
      /* CLICA NO LINK PARA IR PARA PÁGINA DE DETALHES DO POKÉMON */
      const detailsLink = screen.getByRole('link', {
        name: details,
      });
      userEvent.click(detailsLink);

      /* ADICIONA O POKÉMON NOS FAVORITOS */
      const addFavoriteText = screen
        .getByRole('checkbox', { name: 'Pokémon favoritado?' });
      userEvent.click(addFavoriteText);

      /* VERIFICA SE A IMAGEM TEM O ATRIBUTOS "src" COM O CAMINHO "/star-icon.svg" E "alt"
      IGUAL A "<pokemon> is marked as favorite", ONDE "<pokemon>" É O NOME DO POKÉMON EXIBIDO */
      const favoriteIMG = screen.getByRole('img', {
        name: `${element.name} is marked as favorite`,
      });
      expect(favoriteIMG).toHaveAttribute('src', '/star-icon.svg');
      expect(favoriteIMG).toHaveAttribute('alt', `${element.name} is marked as favorite`);

      /* CLICA NO LINK "Home" PARA VOLTAR A PÁGINA INICIAL */
      const linkHome = screen.getByRole('link', { name: 'Home' });
      userEvent.click(linkHome);

      /* CLICA NO BOTÃO "Próximo pokémon" PARA TESTAR O PRÓXIMO POKÉMON */
      for (let i = 0; i <= index; i += 1) {
        const buttonNext = screen.getByRole('button', { name: nextPokemon });
        userEvent.click(buttonNext);
      }
    });
  });
});
