import React from 'react';

import { screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Test the component <About.js />.', () => {
  it('Test if the h2 element about pokedex exists', () => {
    // Render the component:
    renderWithRouter(<About />);

    // Get the h2 element:
    const about = screen.getByRole('heading', { level: 2 });

    // Test if it exists and if it has the correct text:
    expect(about).toBeInTheDocument();
    expect(about.innerHTML).toBe('About Pokédex');
  });

  it('Test if the paragraph session exists', () => {
    // Render the component:
    renderWithRouter(<About />);

    // Get the two p element:
    const Paragraphs = screen.getAllByText(/pokémons/i);

    // Test if it exists:
    expect(Paragraphs).toHaveLength(2);
  });

  it('Test if the image element exists', () => {
    // Render the component:
    renderWithRouter(<About />);

    // Get the h2 element:
    const Image = screen.getByAltText('Pokédex');

    // Test if it exists and if it has the correct text:
    expect(Image).toBeInTheDocument();
    expect(Image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
