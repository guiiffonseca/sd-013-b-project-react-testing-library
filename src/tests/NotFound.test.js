import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

test('', () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  customHistory.push('/pageNotFound');

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
