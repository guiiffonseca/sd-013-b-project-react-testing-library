import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('Verifica se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(<App />);
      const name = screen.getByTestId('pokemon-name');
      const type = screen.getByTestId('pokemon-type');
      const weight = screen.getByTestId('pokemon-weight');
      const img = screen.getByRole('img');

      expect(name).toHaveTextContent(/pikachu/i);
      expect(type).toHaveTextContent(/electric/i);
      expect(weight).toHaveTextContent(/Average weight: 6.0 kg/i);
      expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(img).toHaveAttribute('alt', 'Pikachu sprite');
    });
  test(`Verifica se o card do Pokémon indicado na Pokédex contém um link
    de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL 
    /pokemons/<id>, onde <id> é o id do Pokémon exibido;`, () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
    // Verifica se existe um ícone de estrela nos Pokémons favoritados.
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    const starIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
