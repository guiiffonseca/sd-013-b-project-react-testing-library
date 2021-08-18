import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './utils/RenderWithRouter';

describe('Testa o componente About.js', () => {
  test('se a página contém um heading h2 com o texto About Pokédex.', () => {
    RenderWithRouter(<App />);

    const linkAbout = screen.getByText('About');
    userEvent.click(linkAbout);

    const aboutHeadingText = screen.getByRole('heading', { level: 2 });

    expect(aboutHeadingText).toHaveTextContent('About Pokédex');
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    RenderWithRouter(<App />);

    const linkAbout = screen.getByText('About');
    userEvent.click(linkAbout);

    const aboutText1 = screen.getByText(/This application simulates/i);
    const aboutText2 = screen.getByText(/One can filter/i);

    expect(aboutText1).toBeInTheDocument();
    expect(aboutText2).toBeInTheDocument();
  });

  test('se a página contém a seguinte imagem de uma Pokédex: '
    + 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    RenderWithRouter(<App />);

    const linkAbout = screen.getByText('About');
    userEvent.click(linkAbout);

    const img = screen.getByRole('img');
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img).toHaveAttribute('src', URL);
  });
});
