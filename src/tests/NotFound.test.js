// npx stryker run ./stryker/NotFound.conf.json

import React from 'react';
import NotFound from '../components/NotFound';
import funcGetByRole from '../services/funcGetByRole';
import funcGetByText from '../services/funcGetByText';
import funcTextStrictEqual from '../services/funcTextStrictEqual';

describe('4 - Test component <NotFound />', () => {
  test('contain h2', () => {
    funcGetByRole(<NotFound />, 'heading', { level: 2 });
  });
  test('h2 has text \'Page requested not found\'', () => {
    funcGetByText(<NotFound />, 'Page requested not found');
  });
  test('h2 has text \'not found\'', () => {
    const source = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    funcTextStrictEqual(<NotFound />, 'img', { name: /pikachu/i }, source, 'src');
  });
});
