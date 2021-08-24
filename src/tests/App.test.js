import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../routes/script';

test('O componente <App /> é renderizado.', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const rendersHome = screen.getByRole('link', {
    name: 'Home',
  });
  expect(rendersHome).toBeInTheDocument();
  userEvent.click(rendersHome);
});
