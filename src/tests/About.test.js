import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testing About.js component', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  test('If the page contains a heading h2 with the text About Pokédex.', () => {
    const title = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(title).toBeInTheDocument();
  });

  test('If the page contains two paragraphs with text about Pokédex.', () => {
    const paragraph1 = screen.getByText(/This application simulates/i);
    const paragraphs2 = screen.getByText(/One can filter/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraphs2).toBeInTheDocument();
  });

  test('If the page contains an image of a Pokédex', () => {
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
