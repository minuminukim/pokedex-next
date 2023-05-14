import Image from 'next/image';
import Link from 'next/link';
import { fetchPokemonByName } from '~/utils/fetchers';

export default async function PokemonPage({
  params,
}: {
  params: { name: string };
}) {
  const pokemon = await fetchPokemonByName(params.name);
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <Image
        src={pokemon.spriteUrl}
        alt={pokemon.name}
        width={150}
        height={150}
      />
      <section>
        <h2>Stats</h2>
        <ul>
          {pokemon.stats.map(({ name, value }) => {
            return (
              <li key={name}>
                {name}: {value}
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <h2>Types</h2>
        <ul>
          {pokemon.types.map(({ name }) => {
            return <li key={name}>{name}</li>;
          })}
        </ul>
      </section>
      <Link href="/">Back</Link>
    </div>
  );
}
