import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utility/renderWithRouter';
import { About } from '../components';

test('Verify if About page has informations about Pokédex', () => {
  const { history } = renderWithRouter(<About />);
  history.push('/about');

  const aboutPageText = screen.getByText(/This application simulates a Pokédex/i);
  expect(aboutPageText).toBeInTheDocument();
});

test('Verify if About page has element h2 with "About Pokédex" text', () => {
  const { history } = renderWithRouter(<About />);
  history.push('/about');

  const aboutPageH2 = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/,
  });
  expect(aboutPageH2).toBeInTheDocument();
});

test('Verify if About page has two paragraphs with text', () => {
  const { history } = renderWithRouter(<About />);
  history.push('/about');

  const firstParagraphText = screen.getByText(/This application simulates a Pokédex/i);
  expect(firstParagraphText).toBeInTheDocument();

  const secondParagraphText = screen.getByText(/One can filter Pokémons by type/i);
  expect(secondParagraphText).toBeInTheDocument();
});

test('Verify if About page has a image, and verify the URL', () => {
  const { history } = renderWithRouter(<About />);
  history.push('/about');

  const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const imagePath = screen.getByRole('img');
  expect(imagePath).toHaveAttribute('src', URL);
});
