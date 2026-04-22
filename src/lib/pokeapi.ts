export const getPokemon = async (name: string) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );

  const data = await res.json();

  return {
    name: data.name,
    hp: data.stats[0].base_stat,
    type: data.types[0].type.name,
    sprite: data.sprites.other["official-artwork"].front_default,
  };
};