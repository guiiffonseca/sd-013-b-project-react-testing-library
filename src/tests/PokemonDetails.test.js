import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Test PokemonDetails component', () => {
  test('if pokemons details are show in the screen', () => {
    const { history } = renderWithRouter(<App />);
    // Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.
    const moreDetails = screen.getByText(/more details/i);
    userEvent.click(moreDetails);
    expect(screen.getByText(/pikachu details/i)).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    })).toBeInTheDocument();
    expect(screen
      .getByText(/This intelligent Pokémon roasts hard berries with electricity/i))
      .toBeInTheDocument();
    // Teste se existe na página uma seção com os mapas contendo as localizações do pokémon
    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    expect(screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    }));
    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes
    expect(history.location.pathname).toBe('/pokemons/25');
    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    const imgRoleDetails = screen.getAllByRole('img');
    // A imagem da localização deve ter um atributo src com a URL da localização;
    expect(imgRoleDetails[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();
    // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
    expect(imgRoleDetails[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(imgRoleDetails[2]).toHaveAttribute('alt', 'Pikachu location');
    expect(imgRoleDetails[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
  });
  // Teste se o usuário pode favoritar um pokémon através da página de detalhes.
  test('test favorite', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    // A página deve exibir um checkbox que permite favoritar o Pokémon
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    userEvent.click(screen.getByRole('checkbox'));
    const roleStar = screen.getAllByRole('img')[1];
    expect(roleStar).toHaveAttribute('src', '/star-icon.svg');
    userEvent.click(screen.getByRole('checkbox'));
    expect(roleStar).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('checkbox'));
    expect(roleStar).toHaveAttribute('src', '/star-icon.svg');
    userEvent.click(screen.getByRole('checkbox'));
    expect(roleStar).not.toBeInTheDocument();
    // O label do checkbox deve conter o texto Pokémon favoritado?;
    expect(screen.getByText(/Pokémon favoritado?/i)).toBeInTheDocument();
  });
});
