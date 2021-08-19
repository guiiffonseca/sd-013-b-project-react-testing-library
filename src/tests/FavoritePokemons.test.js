import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
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

  test('testa se o input do more details adiciona ao favoritos', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/');

    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkDetails);

    const searchTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(searchTitle).toBeInTheDocument();

    const searchInput = screen.getByRole('checkbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchInput);

    const linkFavorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(linkFavorite);

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
  });
});
