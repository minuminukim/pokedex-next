import Image from 'next/image';
import Link from 'next/link';
import type { BasePokemon } from '~/utils/fetchers';
import styles from './pokemon.module.css';

type PokemonViewProps = Pick<BasePokemon, 'name' | 'spriteUrl'>;

const PokemonView = ({ name, spriteUrl }: PokemonViewProps) => {
  return (
    <Link href={`/pokemon/${name}`} className={styles.card}>
      <h2>{name}</h2>
      <Image src={spriteUrl} alt={name} width={150} height={150} />
    </Link>
  );
};

type PokemonGridProps = {
  pokemon: Array<BasePokemon>;
};

export const PokemonGrid = ({ pokemon }: PokemonGridProps) => {
  return (
    <ul className={styles.grid}>
      {pokemon.map(({ id, name, spriteUrl }) => {
        return (
          <li key={id}>
            <PokemonView name={name} spriteUrl={spriteUrl} />
          </li>
        );
      })}
    </ul>
  );
};
