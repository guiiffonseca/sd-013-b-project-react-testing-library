import React from 'react';
import { screen } from '@testing-library/react';
import rendeRWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Test of component <notFound />', () => {
  test('Verify if this page contains text "Page requested not found"', () => {
    const { history } = rendeRWithRouter(<App />);
    history.push('/route-no-exists');
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
  test('Verify if in this page have image error ', () => {
    const { history } = rendeRWithRouter(<App />);
    history.push('/route-no-exists');
    const imgError = screen.getByAltText(/Pikachu crying because the page requested/i);
    expect(imgError).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
