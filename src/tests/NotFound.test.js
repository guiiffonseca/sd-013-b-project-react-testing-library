import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Test the notFound page when user try a backdoor', () => {
  it('Should contain "Page requested not found 😭" text content', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/anynotfoundedpage');
    const expectedText = 'Page requested not found 😭';
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(expectedText);
  });

  it('should contain a img o Pikachu crying with the correct src', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/anynotfoundedpage');
    const requestedSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const altText = /Pikachu crying because the page requested was not found/i;
    expect(screen.getByAltText(altText).src).toBe(requestedSrc);
  });
});
