import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('"Not Found" page testing ', () => {
  // beforeEach(() => {
  //   const customHistory = createMemoryHistory();
  //   render(
  //     <Router history={ customHistory }>
  //       <App />
  //     </Router>,
  //   );
  // });
  it('unknown URL redirects to "NotFound" path', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/nonexistent-route');
    const pageNotFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
  it('contains Pikachu gif', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/nonexistent-route');
    const pikachuImg = screen.getAllByRole('img');
    expect(pikachuImg[1])
      .toHaveAttribute(
        'src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
      );
  });
});
