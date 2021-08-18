import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { About } from '../components';
// import App from '../App';

describe('testing cases for About component', () => {
  test('page have infos about the pokedex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutTitle).toBeInTheDocument();
  });
});
