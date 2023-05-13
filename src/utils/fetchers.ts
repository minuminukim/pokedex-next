import { z } from 'zod';
import { BASE_API_URL } from '~/utils/constants';

const PaginatedPokemonSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

const BasePokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  spriteUrl: z.string().url(),
});

export type BasePokemon = z.infer<typeof BasePokemonSchema>;

export async function fetchGenerationOne() {
  const response = await fetch(`${BASE_API_URL}/pokemon?offset=0&limit=151`);
  if (!response.ok) {
    throw Error(`Failed to fetch pokemon, with status ${response.status}`);
  }
  const data = await response.json();
  const pokemon = z.array(PaginatedPokemonSchema).parse(data.results);

  return await Promise.all(
    pokemon.map(async ({ url }) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(`Failed to fetch pokemon, with status ${response.status}`);
      }
      const data = await response.json();
      return BasePokemonSchema.parse({
        id: data.id,
        name: data.name,
        spriteUrl: data.sprites.front_default,
      });
    })
  );
}

const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  spriteUrl: z.string().url(),
  types: z.array(z.object({ name: z.string() })),
  stats: z.array(
    z.object({
      name: z.string(),
      value: z.number(),
    })
  ),
});

export type Pokemon = z.infer<typeof PokemonSchema>;

export type PokemonType = Pokemon['types'][number];
export type PokemonStat = Pokemon['stats'][number];

export async function fetchPokemonByName(name: string) {
  const response = await fetch(`${BASE_API_URL}/pokemon/${name}`);
  if (!response.ok) {
    throw Error(`Failed to fetch pokemon, with status ${response.status}`);
  }
  const data = await response.json();
  return PokemonSchema.parse({
    id: data.id,
    name: data.name,
    spriteUrl: data.sprites.front_default,
    types: data.types.map((type: any) => ({ name: type.type.name })),
    stats: data.stats.map((stat: any) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
  });
}
