import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('If have the necessary informations on pokedex', () => {
  it('should have an h2 element with with text content About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('About Pokédex');
  });

  it('should have the requested text content', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const p1 = screen.getByText('This application simulates a Pokédex, a digital '
     + 'encyclopedia containing all Pokémons');

    const p2 = screen.getByText('One can filter Pokémons by type, and '
    + 'see more details for each one of them');

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('should have a img with the requested url', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    expect(screen.getByAltText(/Pokédex/i).src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
