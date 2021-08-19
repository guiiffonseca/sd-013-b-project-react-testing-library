import pokemons from '../../data';

export default function filterPokemonByType(type) {
  return pokemons.filter((pokemon) => pokemon.type === type);
}
