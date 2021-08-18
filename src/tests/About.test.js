import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../components/About';
import renderWithRouter from './util/renderWithRouter';

describe('Testando o "About"', () => {
  it('Testando o "About"', () => {
    renderWithRouter(<About />);
    const headerAboutPokedex = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(headerAboutPokedex).toBeInTheDocument();
    const p = screen.getAllByText(/,/i);
    const img = screen.getByRole('img');
    expect(p.length).toBe(2);
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
