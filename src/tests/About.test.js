import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

describe('About.js', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('should have a heading with text \'About Pokédex\'', () => {
    const aboutHeading = screen.getByRole('heading', { level: 2 });

    expect(aboutHeading).toBeInTheDocument();
    expect(aboutHeading.innerHTML).toBe('About Pokédex');
  });

  it('should have 2 paragrafs with text about the Pokédex', () => {
    const aboutPs = screen.getAllByText('Pokémons', { exact: false });

    expect(aboutPs).toHaveLength(2);
    aboutPs.forEach((p) => expect(p).toBeInTheDocument());
  });

  it('should have this image \'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png\'', () => {
    const aboutImg = screen.getByAltText('Pokédex');

    expect(aboutImg).toBeInTheDocument();
    expect(aboutImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
