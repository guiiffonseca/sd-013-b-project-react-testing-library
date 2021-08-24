import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/pageNotFound');

  const PageNotFoundText = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(PageNotFoundText).toBeInTheDocument();

  const ImagePokemonNotFound = screen.getByAltText(
    'Pikachu crying because the page requested was not found',
  );
  expect(ImagePokemonNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
