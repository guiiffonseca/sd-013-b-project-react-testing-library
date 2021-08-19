import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

test('se a página contém as informações sobre a Pokédex', () => {
  const { history } = renderWithRouter(<About />);
  history.push('/about');

  const aboutInfo = screen.getByText(/One can filter Pokémons by type/i);
  expect(aboutInfo).toBeInTheDocument();
});

test('se a página contém um heading h2 com o texto About Pokédex', () => {
  const { history } = renderWithRouter(<About />);
  history.push('/about');

  const aboutMainText = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(aboutMainText).toBeInTheDocument();
});

test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { history } = renderWithRouter(<About />);
  history.push('/about');

  // const aboutParagraphs = screen.getByRole(<p />);
  // expect(aboutParagraphs).toHaveLength(2);
});

test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
  const { history } = renderWithRouter(<About />);
  history.push('/about');

  const aboutImage = screen.getByAltText('Pokédex');
  expect(aboutImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
