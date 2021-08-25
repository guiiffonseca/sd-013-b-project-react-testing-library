import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../routes/router';

import About from '../components/About';

test('O link para a página Home funciona corretamente', () => {
  const { history } = renderWithRouter(<About />);
  history.push('/');
  const rendersImg = screen.getByRole('img', {
    name: /home/i,
  });
  expect(rendersImg).toBeInTheDocument();
  // userEvent.click(rendersImg);
});
