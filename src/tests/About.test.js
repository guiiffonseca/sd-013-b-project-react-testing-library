import React from 'react';
import { About } from '../components';
import funcGetByRole from '../services/funcGetByRole';
import funcLengthOfGetAll from '../services/funcLengthOfGetAll';
import funcTextStrictEqual from '../services/funcTextStrictEqual';

// npx stryker run ./stryker/About.conf.json
describe('Requirement 2 - Test the component <About />', () => {
  test('page has h2 with text \'About Pokédex\'', () => {
    funcGetByRole(<About />, 'heading', { level: 2, name: 'About Pokédex' });
  });
  test('page has 2 paragraphs with word \'pokémons\'', () => {
    funcLengthOfGetAll(<About />, /pokémons/i, 2);
  });

  test('page has <img/> with exact source', () => {
    const source = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    funcTextStrictEqual(<About />, 'img', { name: 'Pokédex' }, source, 'src');
  });
});
