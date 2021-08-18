import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('tests of NotFound.test.js', () => {
  test(
    'if the page not found component is rendered when a wrong URL is requested', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pagina/que-nao-existe/');
      const noMatch = screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/,
      });
      expect(noMatch).toBeInTheDocument();
    },
  );

  test('if the image appears when the component is not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const notFoundImg = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/,
    });
    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
