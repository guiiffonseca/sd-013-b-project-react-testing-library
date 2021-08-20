import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('"Favorite Pokémons" page testing', () => {
  it('contains "No favorite pokemon found" message when there are no bookmarks', () => {
    render(<FavoritePokemons />);
    const noFovoriteText = screen.getByText(/no favorite pokemon found/i);
    expect(noFovoriteText).toBeInTheDocument();
  });
  it('contain pokemon card when some was bookmarked', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);
    const bookmarkPokemon = screen.getByRole('checkbox');
    userEvent.click(bookmarkPokemon);
    const favoriteLink = screen.getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(favoriteLink);
    const avarageWeight = screen.getByText(/average weight/i);
    expect(avarageWeight).toBeInTheDocument();
  });
});
