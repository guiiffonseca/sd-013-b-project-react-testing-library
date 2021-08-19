import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NotFound from '../components/NotFound';

describe('if component NotFound.js is working properly', () => {
  it('should display message "Page requested not found" as invalid input throw', () => {
    render(<MemoryRouter><NotFound /></MemoryRouter>);

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFoundText).toBeInTheDocument();
  });

  it('should contain crying Pokachu gif', () => {
    render(<MemoryRouter><NotFound /></MemoryRouter>);

    const cryingPikachuGif = screen.getByAltText(/Pikachu crying/);
    expect(cryingPikachuGif.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
