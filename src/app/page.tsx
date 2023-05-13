import { fetchGenerationOne, type BasePokemon } from '~/utils/fetchers';
import { PokemonGrid } from './_components/pokemon';
import styles from './page.module.css';

export default async function Home() {
  const pokemon = await fetchGenerationOne();
  return (
    <main className={styles.main}>
      <h1>pokedex</h1>
      <PokemonGrid pokemon={pokemon} />
    </main>
  );
}
