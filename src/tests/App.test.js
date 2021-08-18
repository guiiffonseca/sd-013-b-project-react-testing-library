import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderRouter from '../components/renderRouter';
import App from '../App';

Describe('Pokemon test',()=>{
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderRouter=(<App />);
      const linkHome = screen.getByRole('Link',{
          name:'Home',
      });
      expect(linkHome).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto about', () =>   {   
      renderRouter=(<App />);
        const linkAbout = screen.getByRole('Link',{
          name:'About',
        });
      expect(linkAbout).toBeInTheDocument();
  });
    
  test('O terceiro link deve possuir o texto Favorite Pokemons', () => {
      renderRouter = (<App />)
        const linkFavoritePokémons = screen.getByRole('Link',{
          name:'Favorite Pokémons',
        });
      expect(linkFavoritePokémons).toBeInTheDocument();
  });

  test('Teste se a aplicação é redicionada para a pagina Home', () => {
    const { history } = renderRouter(<App />);
    const linkHome = screen.getByRole('Link',{
        name:'Home',
    });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toEqual('/about');
  });

  test('Teste se a aplicação é redicionada para a pagina about', () => {
    const { history } = renderRouter(<App />);
    const linkHome = screen.getByRole('Link',{
        name:'Home',
    });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toEqual('/about');
  });

  test('Teste se a aplicação é redicionada para a pagina página pokemon favorites', () => {
    const { history } = renderRouter(<App />);
    const linkHome = screen.getByRole('Link',{
        name:'Home',
    });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toEqual('/about');
  });

  test('Teste se a aplicação é redicionada para a pagina página not found', () => {
    const { history } = renderRouter(<App />);
    history.push('/pagina/que-nao-existe');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
    
});
