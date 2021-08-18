import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';

import About from '../components/About';

describe('Tests of component <About />', () => {
  test('Verify if page About contains Text correct', () => {
    renderWithRouter(<About />);
    const titlePageAbout = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(titlePageAbout).toBeInTheDocument();
  });
  test('Verify if this page contain two paragraph about Pokédex', () => {
    renderWithRouter(<About />);
    const paragraphOne = screen.getByText(/This application simulates a Pokédex/i);
    const paragraphTwo = screen.getByText(/One can filter Pokémons by/i);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });
  test('Verify if this page contains image Pokédex', () => {
    renderWithRouter(<About />);
    const imagePokedex = screen.getByRole('img');
    expect(imagePokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
