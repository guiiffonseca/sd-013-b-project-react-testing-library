import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import App from '../App';

function renderWithRouter(component) {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
}

test('Teste se página contém um heading h2 com o texto Page requested not found 😭',
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFoundText = screen.getByText(/Page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
  });

test('Teste se página mostra a imagem com o path correto.', () => {
  const { history } = renderWithRouter(<App />);
  const notFoundImageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  history.push('/xablau');
  const notFoundImage = screen.getAllByRole('img');
  expect(notFoundImage[1]).toHaveAttribute('src', notFoundImageUrl);
});
