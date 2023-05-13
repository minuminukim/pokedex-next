import { z } from 'zod';
import { BASE_API_URL } from '~/utils/constants';

const PaginatedPokemonSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  spriteUrl: z.string().url(),
});

export type BasePokemon = z.infer<typeof PokemonSchema>;

export async function fetchGenerationOne() {
  const response = await fetch(`${BASE_API_URL}/pokemon?offset=0&limit=150`);
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
      return PokemonSchema.parse({
        id: data.id,
        name: data.name,
        spriteUrl: data.sprites.front_default,
      });
    })
  );
}
