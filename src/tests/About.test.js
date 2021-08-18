import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('About.js tests', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('should have a heading h2 with the text "About Pokédex"', () => {
    expect(
      screen.getByRole('heading', { level: 2, name: 'About Pokédex' }),
    ).toBeInTheDocument();
  });

  it('should have two paragraphs with text about pokedex', () => {
    expect(screen.getAllByText(/Pokémons/).length).toBe(2);
  });

  it('should have a specific image', () => {
    const img = screen.getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
