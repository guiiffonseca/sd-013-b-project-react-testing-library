import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se é renderizado um card', () => {
  const POKEMONS_PATHS = '/pokemons/25';
  test('O link deve possuir a URL /pokemons/ é o id do Pokémon exibido;', () => {
    const { history } = renderWithRouter(<App />);
    const botaoDetalhe = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(botaoDetalhe);
    const paths = history.location.pathname;
    expect(paths).toBe(POKEMONS_PATHS);
  });

  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMONS_PATHS);
    const nome = screen.getByTestId('pokemon-name');
    const nomePicaku = screen.getAllByText(/pikachu/i);
    expect(nome).toBeInTheDocument();
    const xablau = 3;
    expect(nomePicaku.length).toBe(xablau);
    const tipoDocumento = screen.getByTestId('pokemon-type');
    expect(tipoDocumento).toBeInTheDocument();
    const average = screen.getByTestId('pokemon-weight');
    expect(average).toBeInTheDocument();
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

  test('tocar do favorito e ver se está a foto', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMONS_PATHS);
    const favorito = screen.getByLabelText(/pokémon favoritado/i);
    fireEvent.click(favorito);
    const image = screen.getAllByRole('img');
    expect(image[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(image[1]).toHaveAttribute('src', '/star-icon.svg');
  });
});
