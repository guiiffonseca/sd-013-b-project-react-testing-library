import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithrouter';
import App from '../App';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
    const aboutAll = screen.getByText('Pokédex');
    expect(aboutAll).toBeInTheDocument();

  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
    const aboutPokedex = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutPokedex).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
    const p1 = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons';
    expect(screen.getByText(p1)).toBeInTheDocument();
    const p2 = 'One can filter Pokémons by type, and see more details for each one of them';
    expect(screen.getByText(p2)).toBeInTheDocument();
  });
  it('Teste se a página contém uma determinada imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
    // Usei como referencia o site https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
    const image = screen.getByAltText('Pokédex');
    const scr = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toContain(scr);
  });
});
