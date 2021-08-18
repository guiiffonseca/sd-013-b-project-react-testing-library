import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithrouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/home/i));
    history.push('/pagina/que-nao-existe/');
    const noMatch = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/ });
    expect(noMatch).toBeInTheDocument();
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    const scr = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toContain(scr);
  });
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/home/i));
    history.push('/pagina/que-nao-existe/');
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    const scr = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toContain(scr);
  });
});
