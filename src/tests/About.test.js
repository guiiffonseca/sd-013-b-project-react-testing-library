import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('About.js', () => {
  test('testa se a página contém as iformações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const pageInfoPokedex = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(pageInfoPokedex).toBeInTheDocument();
  });

  test('testa de a pagina contem "2 <p>" com texto sob Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const paragraf = screen.getByText(/This application simulates/i);
    const paragraf2 = screen.getByText(/One can filter/i);

    expect(paragraf).toBeInTheDocument();
    expect(paragraf2).toBeInTheDocument();
  });

  test('testa se a página contém a seguinte "img" Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const pageImg = screen.getByRole('img', {
      name: 'Pokédex',
    });

    expect(pageImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
