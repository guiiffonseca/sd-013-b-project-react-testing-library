import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Requirement 2 - Test the component <About />', () => {
  beforeEach(() => {
    render(<About />);
  });
  it('should the page contains the h2 element with text "About Pokédex"', () => {
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    const h2Text = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(h2Text).toBeInTheDocument();
  });

  it('should the page contains two paragraphs about the Pokédex', () => {
    const info = screen.getAllByText(/pokémons/i);
    expect(info).toHaveLength(2);
  });

  it('should the page contains a Pokédex image', () => {
    const image = screen.getByRole('img', { name: 'Pokédex' });
    expect(image.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
