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
    expect(p.length).toBe(2);
  });
});
