import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const POKEMONS_PATHS = '/pokemons/25';

describe('Teste se um card com as informações pokémon é renderizado', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const idName = screen.getByTestId('pokemon-name');
    expect(idName).toBeInTheDocument();
    const nomePika = screen.getAllByText(/Pikachu/i);
    expect(nomePika[0]).toBeInTheDocument();
  });

  test('O tipo correto do pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const tipoDocumento = screen.getByTestId('pokemon-type');
    expect(tipoDocumento).toBeInTheDocument();
    const tipoNome = screen.getAllByText(/electric/i);
    expect(tipoNome[1]).toBeInTheDocument();
  });

  test('O peso médio do pokémon deve ser exibido com um texto', () => {
    renderWithRouter(<App />);
    const average = screen.getByTestId('pokemon-weight');
    expect(average).toBeInTheDocument();
    const detalhes = screen.getByText(/average weight: 6.0 kg/i)
  });

  test('A imagem do Pokémon deve ser exibida', () => {
    renderWithRouter(<App />);
    const image = screen.getAllByRole('img');
    expect(image[0]).toHaveAttribute('alt', 'Pikachu sprite');
    expect(image[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('teste de tipo', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMONS_PATHS);
    const tipoDocumento = screen.getByTestId('pokemon-type');
    expect(tipoDocumento).toBeInTheDocument();
    const tipoNome = screen.getAllByText(/electric/i);
    expect(tipoNome[0]).toBeInTheDocument();
  });
});

describe('Teste geral do Pokemon', () => {
  test('O link deve possuir a URL /pokemons/ é o id do Pokémon exibido', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMONS_PATHS);
    const pathAtual = history.location.pathname;
    expect(pathAtual).toBe(POKEMONS_PATHS);
  });

  test('ao clicar no link da navegação é feito o redirecionamento para a página', () => {
    const { history } = renderWithRouter(<App />);
    const botaoDetalhe = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(botaoDetalhe);
    const paths = history.location.pathname;
    expect(paths).toBe(POKEMONS_PATHS);
  });

  test('URL exibida no navegador muda é o id do Pokémon cujos detalhes se ver', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMONS_PATHS);
    const numeroDeVezes = screen.getAllByText(/pikachu/i);
    const quantidadeQueApareceDaTela = 3;
    expect(numeroDeVezes.length).toBe(quantidadeQueApareceDaTela);
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  test('teste da imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMONS_PATHS);
    const favorito = screen.getByLabelText(/pokémon favoritado/i);
    fireEvent.click(favorito);
    const voltarAoHome = '/';
    history.push(voltarAoHome);
    const image = screen.getAllByRole('img');
    expect(image[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(image[1]).toHaveAttribute('src', '/star-icon.svg');
  });
});


describe('Teste se um card com as informações pokémon é renderizado', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMONS_PATHS);
    const idName = screen.getByTestId('pokemon-name');
    expect(idName).toBeInTheDocument();
  });

  test('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMONS_PATHS);
    const tipoDocumento = screen.getByTestId('pokemon-type');
    expect(tipoDocumento).toBeInTheDocument();
  });

  test('O peso médio do pokémon deve ser exibido com um texto', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMONS_PATHS);
    const average = screen.getByTestId('pokemon-weight');
    expect(average).toBeInTheDocument();
    const avera = screen.getByText(/average weight: 6.0 kg/i)
  });

  test('A imagem do Pokémon deve ser exibida', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMONS_PATHS);
    const image = screen.getAllByRole('img');
    expect(image[0]).toHaveAttribute('alt', 'Pikachu sprite');
    expect(image[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o tipo do pokemons aparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');
    const tipo = screen.getByText(/fire/i);
    expect(tipo).toBeInTheDocument();
  });
});
