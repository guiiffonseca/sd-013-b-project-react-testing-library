import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import RenderWithRouter from './utils/RenderWithRouter';
import App from '../App';

describe('Testando PokeCards', () => {
  const buttonId = 'pokemon-type-button';
  test('Testa se o nome do pokemon é mostrado na tela', () => {
    RenderWithRouter(<App />);
    const pokeName = screen.getByTestId('pokemon-name');
    const eletricButton = screen.getAllByTestId(buttonId);
    fireEvent.click(eletricButton[0]);

    expect(pokeName).toHaveTextContent('Pikachu');
  });

  test('Testa se o tipo do pokemon existe', () => {
    RenderWithRouter(<App />);
    const pokeType = screen.getByTestId('pokemon-type');
    const button = screen.getAllByTestId(buttonId);
    fireEvent.click(button[1]);

    expect(pokeType).toHaveTextContent('Fire');
  });

  test('Testa se o peso existe', () => {
    RenderWithRouter(<App />);
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const button = screen.getAllByTestId(buttonId);
    fireEvent.click(button[3]);

    expect(pokeWeight).toHaveTextContent('Average weight: 6.9 kg');
  });

  test('Testa se a imagem existe', () => {
    RenderWithRouter(<App />);
    const pokeImmage = screen.getByRole('img');
    const button = screen.getAllByTestId('pokemon-type-button');
    fireEvent.click(button[3]);

    expect(pokeImmage).toBeInTheDocument();
    expect(pokeImmage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png');
    expect(pokeImmage).toHaveAttribute('alt', 'Ekans sprite');
  });

  test('Testa funcionalidae favoritos', () => {
    RenderWithRouter(<App />);
    const button = screen.getAllByTestId(buttonId);
    const homeButton = screen.getByText('Home');
    fireEvent.click(button[0]);

    fireEvent.click(screen.getByText('More details'));
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(homeButton);
    const starImg = screen.getAllByRole('img')[1];
    expect(starImg).toBeInTheDocument();
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
    expect(starImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });

  test('Testa se existe botão More details', () => {
    const { history } = RenderWithRouter(<App />);
    const moreDetail = screen.getByText('More details');
    const button = screen.getAllByTestId(buttonId);
    fireEvent.click(button[3]);

    expect(moreDetail).toBeInTheDocument();
    fireEvent.click(moreDetail);

    expect(history.location.pathname).toBe('/pokemons/23');
  });

});
