import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('About the component About.js', () => {
  it('verifies if there are the correct information about the application', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByText(/About/i);

    fireEvent.click(aboutLink);

    const pokedexInfo = screen.getByText(/This application simulates a Pokédex/i);
    const pokedexInfo2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(pokedexInfo).toBeInTheDocument();
    expect(pokedexInfo2).toBeInTheDocument();
  });

  it('verifies if theres a heading tag', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading');
    expect(aboutTitle.textContent).toBe('About Pokédex');
  });

  it('verfies if the page has 2 paragraphs about the application', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByText(/About/i);

    fireEvent.click(aboutLink);

    const p1 = screen.getByText(/This application/i);
    const p2 = screen.getByText(/One can filter/i);
    const paragraphs = [p1, p2];
    const expectedLength = 2;
    expect(paragraphs.length).toBe(expectedLength);
  });

  it('verfies if the page has a specific image', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByText(/About/i);

    fireEvent.click(aboutLink);

    const img = screen.getByRole('img');
    const actual = img.src;
    const expected = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(actual).toBe(expected);
  });
});
