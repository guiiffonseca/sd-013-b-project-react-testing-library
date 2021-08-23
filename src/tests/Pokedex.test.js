import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('testando o componente Podeked', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByText('Encountered pokémons');
    expect(heading).toBeInTheDocument();
  });
  test(`se é exibido o próximo Pokémon da lista
   quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const next = screen.getByText('Próximo pokémon');
    expect(next).toBeInTheDocument();
    const click = () => fireEvent.click(screen.getByText(/Próximo pokémon/i));
    click();
    const second = screen.getByText('Charmander');
    expect(second).toBeInTheDocument();
    const repeat = 8;
    for (let index = 0; index < repeat; index += 1) {
      click();
    }
    const first = screen.getByText('Pikachu');
    expect(first).toBeInTheDocument();
  });
  test('se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const amount = screen.getAllByTestId('pokemon-name');
    expect(amount.length).toBe(1);
  });
  test('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const Electric = screen.getByRole('button', { name: /Electric/i });
    expect(Electric).toBeInTheDocument();
    const Fire = screen.getByRole('button', { name: /Fire/i });
    expect(Fire).toBeInTheDocument();
    const Bug = screen.getByRole('button', { name: /Bug/i });
    expect(Bug).toBeInTheDocument();
    const Poison = screen.getByRole('button', { name: /Poison/i });
    expect(Poison).toBeInTheDocument();
    const Psychic = screen.getByRole('button', { name: /Psychic/i });
    expect(Psychic).toBeInTheDocument();
    const Normal = screen.getByRole('button', { name: /Normal/i });
    expect(Normal).toBeInTheDocument();
    const Dragon = screen.getByRole('button', { name: /Dragon/i });
    expect(Dragon).toBeInTheDocument();
  });
  test(`se partir da seleção de um botão de tipo,
   a Pokédex deve circular somente pelos pokémons daquele tipo`, () => {
    renderWithRouter(<App />);
    const fire = screen.getByRole('button', { name: /Fire/i });
    fireEvent.click(fire);
    const next = screen.getByRole('button', { name: /Próximo pokémon/i });
    fireEvent.click(next);
    const second = screen.getByText('Rapidash');
    expect(second).toBeInTheDocument();
  });
  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: /All/i });
    expect(all).toBeInTheDocument();
    const click = () => fireEvent.click(all);
    const repeat = 8;
    for (let index = 0; index < repeat; index += 1) {
      click();
    }
    const first = screen.getByText('Pikachu');
    expect(first).toBeInTheDocument();
  });
  test('se o texto do botão correspode tipo', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Fire' });
    expect(button).toHaveAttribute('data-testid', 'pokemon-type-button');
    console.log(button);
  });
});
