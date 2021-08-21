import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { screen, render } from '@testing-library/react';
import App from '../App';

function renderWithRoute(component) {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
}

test(
  'Exibe na tela a mensagem No favorite pokemon found,se não tiver pokémons favoritos',
  () => {
    const { history } = renderWithRoute(<App />);
    history.push('/favorites');
    const noFavText = screen.getByText(/no favorite pokemon found/i);
    expect(noFavText).toBeInTheDocument();
  },
);
