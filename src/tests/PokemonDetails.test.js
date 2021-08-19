import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
// import PokemonDetails from '../components/PokemonDetails';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('se informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    // Renderiza :
    renderWithRouter(<App />);

    // simula click more details:
    const buttonMoreDetails = screen.getByText(/More details/i);
    userEvent.click(buttonMoreDetails);

    // testes:
    const namePokemonDetails = screen.getByText('Pikachu Details');
    expect(namePokemonDetails).toBeInTheDocument();

    // nao deve existir links de navegaçao:
    const linkHome = screen.getByText(/Home/i);
    expect(linkHome).toBeEnabled();
    const linkAbout = screen.getByText(/About/i);
    expect(linkAbout).toBeEnabled();
    const linkFavoritePokemons = screen.getByText(/Favorite Pokémons/i);
    expect(linkFavoritePokemons).toBeEnabled();
    // nao deve existir link de datalhes:
    expect(buttonMoreDetails).toBeEnabled();

    // se existe h2 summary:
    const headingSummary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(headingSummary).toBeInTheDocument();
    expect(headingSummary).toHaveTextContent('Summary');

    // se existe resumo do pokemon especifico:
    const paragraphSummary = screen.getByText(/electricity/i);
    expect(paragraphSummary).toBeInTheDocument();
  });

  test('existe na página seção com os mapas contendo as localizações do pokémon', () => {
    // Renderiza :
    renderWithRouter(<App />);

    // simula click more details:
    const buttonMoreDetails = screen.getByText('More details');
    userEvent.click(buttonMoreDetails);

    // testes:
    // heading summary:
    const headingLocations = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations/i,
    });
    expect(headingLocations).toBeInTheDocument();
    expect(headingLocations).toHaveTextContent('Game Locations of Pikachu');
    // se tem todas localizaçoes dele:
    const location1 = screen.getByText('Kanto Viridian Forest');
    expect(location1).toBeInTheDocument();
    const location2 = screen.getByText('Kanto Power Plant');
    expect(location2).toBeInTheDocument();
    // se tem imagens do mapa das localizações:
    const imageLocations = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(imageLocations.length).toBe(2);
    // Se imagens tem seus devidos src:
    expect(imageLocations[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imageLocations[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    // se imagens tem seus devidos alt:
    expect(imageLocations[0].alt).toBe('Pikachu location');
    expect(imageLocations[1].alt).toBe('Pikachu location');
  });

  test('Se usuario pode Favoritar pokemon na pagina details', () => {
    renderWithRouter(<App />);

    // simula click details:
    const buttonMoreDetails = screen.getByText('More details');
    userEvent.click(buttonMoreDetails);

    // Testes:
    const checkbokFavorite = screen.getByRole('checkbox');
    expect(checkbokFavorite).toBeInTheDocument();

    // simula click para favoritar:
    userEvent.click(checkbokFavorite);
    // testa se favoritou:
    const imagePokemonFavorited = screen.getByAltText('Pikachu is marked as favorite');
    expect(imagePokemonFavorited).toBeInTheDocument();

    // simula click para desfavoritar:
    userEvent.click(checkbokFavorite);
    // testa:
    expect(imagePokemonFavorited).toBeEnabled();
    // testa se label existe:
    const labelCheckboxFavotited = screen.getByLabelText('Pokémon favoritado?');
    expect(labelCheckboxFavotited).toBeInTheDocument();
  });
});
