import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('se existem dois paragrafos na rota "About" ', () => {
  renderWithRouter(<App />);
  const About = screen.getByRole('link', {
    name: /About/i,
  });
  userEvent.click(About);

  const AboutPokedex = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(AboutPokedex).toBeInTheDocument();

  const paragraphOne = screen.getByText(/This application simulates a Pokédex/i);
  expect(paragraphOne).toBeInTheDocument();

  const paragraphDois = screen.getByText(/filter Pokémons by type,/i);
  expect(paragraphDois).toBeInTheDocument();
});

test('se existe uma imagem na rota "About" da pokedex ', () => {
  renderWithRouter(<App />);
  const About = screen.getByRole('link', {
    name: /About/i,
  });
  userEvent.click(About);

  const ImagePokedex = screen.getByRole('img');
  expect(ImagePokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
