import { NextResponse } from 'next/server';
import { z } from 'zod';

const BASE_URL = 'https://pokeapi.co/api/v2/';
const POKEMON_URL = 'pokemon/';

const POKEMON_API = BASE_URL + POKEMON_URL;

const FIRST_GEN = 151;

const firstGenerationResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});

const pokemonResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  sprites: z.object({
    front_default: z.string(),
  }),
  types: z.array(
    z.object({
      type: z.object({
        name: z.string(),
      }),
    })
  ),
});

export async function getFirstGenerationPokemon() {
  try {
    const response = await fetch(`${POKEMON_API}'?limit='${FIRST_GEN}`);
    const parsedResponse = firstGenerationResponseSchema.parse(response);
    const pokemonNames = parsedResponse.results.map((pokemon) => pokemon.name);
    const pokemonWithDetails = await Promise.allSettled(
      pokemonNames.map((pokemon) => getPokemonByName(pokemon))
    );
    return pokemonWithDetails.flatMap((pokemon) => {
      if (pokemon.status === 'fulfilled') {
        return pokemonResponseSchema.parse({
          name: pokemon.value.name,
          id: pokemon.value.id,
          height: pokemon.value.height,
          weight: pokemon.value.weight,
          image: pokemon.value.sprites.front_default,
          types: pokemon.value.types.map((type) => type.type.name),
        });
      }
      return []; // TODO: handle error; maybe return a default pokemon?
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error;
    }
    return NextResponse.error();
  }
}

export async function getPokemonByName(name: string) {
  const response = await fetch(`${POKEMON_API}${name}`);
  const parsedResponse = pokemonResponseSchema.parse(response);
  return parsedResponse;
}
