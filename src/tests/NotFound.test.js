import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Test NotFound', () => {
  test('', () => {
    render(
      <NotFound />,
    );
    const heading = screen.getByRole('heading');

    expect(heading.textContent).toBe('Page requested not found 😭');
  });

  test(' Text image', () => {
    render(
      <NotFound />,
    );

    const image = screen.getAllByRole('img')[1];

    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
