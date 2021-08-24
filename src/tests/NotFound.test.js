import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('About the NotFound page', () => {
  it('verifies if the message displayed in the page is correct', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/panetone');
    const actualMessage = screen.getByText(/Page requested not found/i).textContent;
    const expectedMessage = 'Page requested not found 😭';

    expect(actualMessage).toBe(expectedMessage);
  });

  it('verifies if the img displayed in the page is te correct one', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/panetone');
    const imagePath = screen.getByAltText(/Pikachu crying because/i).src;
    const expected = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imagePath).toBe(expected);
  });
});
