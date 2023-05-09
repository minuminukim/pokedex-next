// import Image from 'next/image';
// import Link from 'next/link';
import styles from './page.module.css';
import { getFirstGenerationPokemon } from './services';
import { ZodError } from 'zod';

export default async function Home() {
  const pokemon = await getFirstGenerationPokemon();
  if (!pokemon) return <h1>Loading...</h1>;
  if (pokemon instanceof ZodError) return <h1>Error</h1>;

  console.log(pokemon);
  return (
    <main className={styles.main}>
      {/* {pokemon.map((pokemon) => (
        <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name}>
          <h2>{pokemon.name}</h2>
          <Image
            src={pokemon.sprite}
            alt={pokemon.name}
            width={100}
            height={100}
          />
        </Link>
      ))} */}
    </main>
  );
}
