import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import { About } from '../components';

function concatenateText(a, b) {
  return a + b;
}

test('Verifica se a página contém as informações sobre a Pokédex.', () => {
  renderWithRouter(<About />);
  const text = concatenateText('This application simulates a Pokédex,',
    ' a digital encyclopedia containing all Pokémons');
  const linkElement = screen.getByText(text);
  expect(linkElement).toBeInTheDocument();
});

test('Página contém h2 com texto About Pokédex', () => {
  renderWithRouter(<About />);
  const linkElement = screen.getByRole('heading', { level: 2 });
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.innerHTML).toBe('About Pokédex');
});

test('Página contém 2 parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<About />);
  const linkElement = screen.getByRole('heading');
  expect(linkElement).toBeInTheDocument();
});

test('Página contém imagem de uma Pokédex', () => {
  renderWithRouter(<About />);
  const linkElement = screen.getByRole('img');
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
