test('', () => {});
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { FavoritePokemons } from '../components';
// import userEvent from '@testing-library/user-event';
// import { MemoryRouter } from 'react-router-dom';
// import { Promise } from 'bluebird';

// const pokemonMock = {"id":25,"name":"Pikachu","type":"Electric","averageWeight":{"value":"6.0","measurementUnit":"kg"},"image":"https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png","moreInfo":"https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)","foundAt":[{"location":"Kanto Viridian Forest","map":"https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png"},{"location":"Kanto Power Plant","map":"https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png"}],"summary":"This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat."}

// describe('testando o componente FavoritePokemons', () => {
//   test('renderiza o texto No favorite pokemon found', () => {
//     render(<FavoritePokemons />);
//     const favoritePText = screen.getByText(/No favorite pokemon found/i);
//     expect(favoritePText).toBeInTheDocument();
//   });
//   test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
//     // render(<FavoritePokemons />);
//     // global.fetch = jest.fn(() => Promise.resolve({
//     //   jason: () => Promise.resolve(pokemonMock);
//     // }))
//     // const imgStar = screen.getByRole('img');
//     // expect(imgStar.src).toBe('http://localhost:3000/star-icon.svg');
//     // // const details = screen.getByTestId(/More details/i);
//     // // expect(details).toBeInTheDocument();
//   });
// });
