import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../routes/router';

import About from '../components/About';

test('O título da seção é renderizado com o texto "About Pokédex".', () => {
  const { history } = renderWithRouter(<About />);
  const rendersTitle = screen.getByRole('heading', {
    name: /about pokédex/i,
  });
  expect(rendersTitle).toBeInTheDocument();
});

test('A imagem da pokédex é renderizada.', () => {
  const { history } = renderWithRouter(<About />);
  const rendersImg = screen.getByAltText('Pokédex');
  const dex = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/';
  const image = 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(rendersImg.src).toBe(`${dex}${image}`);
});