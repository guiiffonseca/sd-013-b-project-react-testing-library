import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

function nextElementByButton(btnName, name, type, weight) {
  renderWithRouter(<App />);

  const btn = screen.getByRole('button', {
    name: btnName,
  });
  const pokemonName = screen.getByTestId('pokemon-name');
  const pokemonType = screen.getByTestId('pokemon-type');
  const pokemonWeight = screen.getByTestId('pokemon-weight');

  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
  expect(pokemonName).toHaveTextContent(name);
  expect(pokemonType).toHaveTextContent(type);
  expect(pokemonWeight).toHaveTextContent(`Average weight: ${weight} kg`);
}

describe('Testando o componente <Pokedex.js />', () => {
  test('Testa se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const pokedexText = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(pokedexText).toBeInTheDocument();
  });

  test('Testa o botão All precisa estar sempre visível."', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', {
      name: /All/i,
    });

    expect(btnAll).toBeInTheDocument();
  });

  test('Testa se o próximo Pokémon aparece quando o botão próximo é clicado', () => {
    nextElementByButton('Próximo pokémon', 'Charmander', 'Fire', '8.5');
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByRole('button');
    const btnEletric = filterButtons[1];
    const btnFire = filterButtons[2];
    const btnBug = filterButtons[3];
    const btnPoison = filterButtons[4];
    const btnPsychic = filterButtons[5];
    const btnNormal = filterButtons[6];
    const btnDragon = filterButtons[7];
    expect(btnEletric).toHaveTextContent('Electric');
    expect(btnFire).toHaveTextContent('Fire');
    expect(btnBug).toHaveTextContent('Bug');
    expect(btnPoison).toHaveTextContent('Poison');
    expect(btnPsychic).toHaveTextContent('Psychic');
    expect(btnNormal).toHaveTextContent('Normal');
    expect(btnDragon).toHaveTextContent('Dragon');
  });

  test('O texto do botão deve corresponder ao nome do tipo', () => {
    renderWithRouter(<App />);
    // capturo todos os botoes da página
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    // Verifico se cada botão tem o nome igual ao tipo do pokemon
    // começo o laço com 1 porque o indice 0 é o botão com nome All
    for (let index = 1; index < filterButtons.length; index += 1) {
      // defino um botao baseado no index do array, o qual será passado como parametro no click do userevent
      const element = filterButtons[index];
      // capturo o tipo do pokemon especificamente pelo atributo name === botao.name
      const pokemonType = screen.getByTestId('pokemon-type', { name: element });
      // clica no botão especifico
      userEvent.click(element);
      expect(element).toHaveTextContent(pokemonType.innerHTML);
    }
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    nextElementByButton('All', 'Pikachu', 'Electric', '6.0');
  });
});
