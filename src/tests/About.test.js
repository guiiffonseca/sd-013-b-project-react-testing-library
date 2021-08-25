import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './util/renderWithRouter';
import { About } from '../components';

describe('tests the component About and its elements', () => {
  beforeEach(() => renderWithRouter(<About />));

  it('should have a Pokédex information', () => {
    const information = screen.getByText(/This application simulates/);
    expect(information).toBeInTheDocument();
  });

  it('should have a heading h2 white "About Pokédex" text', () => {
    const heading = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('should have two descriptions texts', () => {
    const firstText = screen.getByText(/This application simulates/);
    const secondText = screen.getByText(/One can filter Pokémons/);
    expect(firstText && secondText).toBeInTheDocument();
  });

  it('should have a image with link /Pok%C3%A9dex.png/', () => {
    const image = screen.getByAltText('Pokédex');
    const link = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toStrictEqual(link);
  });
});
