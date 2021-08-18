import React from 'react';
import { render } from 'react-dom';
import App from '../App';

Describe('Pokemon test',()=>(
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    render(<App />);

      const linkHome = screen.getByRole('Link',{
          name:/Home/,
        });
        userEvent.click(linkHome);
       const homePage = screen.getByRole('Heading',{
          level: 2 ,
          name:/Encountered/ ,
       })  

        expect(homePage).toBeInTheDocument();

        const linkAbout = screen.getByRole('Link',{
            name:/About/,
        });
        userEvent.click(linkAbout);

        const pageAbout = screen.getByRole('Heading',{
            level:2,
            name:/About Pokédex/i,
        });
      
        expect(pageAbout).toBeInTheDocument();

        const linkFavoritePokémons = screen.getByRole('Link',{
            name:/Favorite Pokémons/,
        });
        userEvent.click(linkFavoritePokémons);

        const pageFavoritePokémons = screen.getByRole('Article',{
            name:/No favorite/,
        });
      
        expect(pageFavoritePokémons).toBeInTheDocument();
    })
  
)
);
