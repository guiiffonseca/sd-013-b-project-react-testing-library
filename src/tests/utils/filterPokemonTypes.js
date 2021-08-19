import pokemons from '../../data';

export default function filterPokemonTypes() {
  const allPokemonTypes = pokemons.map((pokemon) => pokemon.type);

  return [...new Set(allPokemonTypes)];
}
