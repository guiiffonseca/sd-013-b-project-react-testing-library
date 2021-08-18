import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { About } from '../components';
// import App from '../App';

describe('testing cases for About component', () => {
  test('page have a title named "About Pokédex"', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutTitle).toBeInTheDocument();
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toBeInTheDocument();
  });

  test('the page has a image about Pókedex', () => {
    renderWithRouter(<About />);
    const imagePokedex = screen.getByAltText(/Pokédex/i);
    expect(imagePokedex).toBeInTheDocument();
    // expect do atributo src feito com ajuda de pesquisa ao site:
    // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    expect(imagePokedex)
      .toHaveAttribute('src',
        'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  test('the page has two paragraphs about Pokédex', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen
      .getByText(
        /This application simulates a Pokédex/i,
      );
    expect(firstParagraph).toBeInTheDocument();
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(secondParagraph).toBeInTheDocument();
  });
});
