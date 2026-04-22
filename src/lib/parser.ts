import { getPokemon } from "./pokeapi";

export const parseCode = async (code: string) => {
  const lines = code.split("\n");
  const results: any[] = [];

  for (const line of lines) {
    const match = line.match(/(\w+)\s*=\s*Pokemon\("(\w+)"\)/);

    if (match) {
      const instanceName = match[1];
      const pokemonName = match[2];

      const data = await getPokemon(pokemonName);

      results.push({
        instanceName,
        name: data.name,
        sprite: data.sprite,
        hp: data.hp,
        type: data.type,
      });
    }
  }

  return results;
};