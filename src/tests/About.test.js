import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('about tests', () => {
  it('should see the infos', () => {
    render(<About />);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(h2).toBeInTheDocument();

    const p1 = screen.getByText(
      'This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons',
    );
    expect(p1).toBeInTheDocument();

    const p2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(p2).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
