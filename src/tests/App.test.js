import React from 'react';
import App from '../App';
import funcGetByRole from '../services/funcGetByRole';
import funcClickRole from '../services/funcClickRole';

// npx stryker run ./stryker/App.conf.json
describe('1 - Test component <APP/>', () => {
  test('if there is a link with text \'Home\'', () => {
    funcGetByRole(<App />, 'link', { name: /home/i });
  });
  test('if there is a link with text \'About\'', () => {
    funcGetByRole(<App />, 'link', { name: /About/i });
  });
  test('if there is a link with text \'Favorite Pokémons\'', () => {
    funcGetByRole(<App />, 'link', { name: /favorite pokémons/i });
  });
  test('test \'Home\' links path', () => {
    funcClickRole(<App />, 'link', { name: /home/i }, '/');
  });
  test('test \'About\' links path', () => {
    funcClickRole(<App />, 'link', { name: /About/i }, '/about');
  });
  test('test \'Favorite Pokémons\' links path', () => {
    funcClickRole(<App />, 'link', { name: /favorite pokémons/i }, '/favorites');
  });
});
