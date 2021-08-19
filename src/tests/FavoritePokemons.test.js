import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
// import userEvent from '@testing-library/user-event';
import App from '../App';

describe('favoritePokemons test', () => {
  test('exibe o texto - No favorite pokemon found', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/favorites');
    const searchText = screen.getByText('No favorite pokemon found');
    expect(searchText).toBeInTheDocument();
  });

  // test('Existe informações sobre Pokédex', () => {
  //   const customHistory = createMemoryHistory();
  //   render(
  //     <Router history={ customHistory }>
  //       <App />
  //     </Router>,
  //   );
  //   customHistory.push('/favorites');
  //   const image = screen.getByAltText(/Pikachu crying/);
  //   console.log(image);
  //   // expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  // });
});
