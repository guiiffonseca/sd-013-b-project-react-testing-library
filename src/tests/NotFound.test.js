import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('favoritePokemons test', () => {
  test('exibe - Page requested not found', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/thereisnt');
    const searchText = screen.getByText('Page requested not found');
    expect(searchText).toBeInTheDocument();
  });

  test('exibe um gif do pikachu', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/thereisnt');
    const image = screen.getByAltText(/Pikachu crying/);
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
