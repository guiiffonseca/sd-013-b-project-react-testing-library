import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './utility/renderWithRouter';
import App from '../App';

test('Verify if the text "Page requested not found" is in the page', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/page-not-found');

  const textWithRoleH2 = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/,
  });
  expect(textWithRoleH2).toBeInTheDocument();
});

test('Verify if the img of crying pikachu is shown in the page', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/page-not-found');

  const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const imageOfPikachu = screen.getAllByRole('img')[1];
  expect(imageOfPikachu).toHaveAttribute('src', URL);
});
