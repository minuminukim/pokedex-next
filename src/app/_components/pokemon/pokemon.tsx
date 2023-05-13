import Image from 'next/image';
import Link from 'next/link';
import type { BasePokemon } from '~/utils/fetchers';
import styles from './pokemon.module.css';

const PokemonView = ({
  name,
  spriteUrl,
}: Pick<BasePokemon, 'name' | 'spriteUrl'>) => {
  return (
    <Link href={`/pokemon/${name}`} className={styles.card}>
      <h2>{name}</h2>
      <Image src={spriteUrl} alt={name} width={150} height={150} />
    </Link>
  );
};

export const PokemonGrid = ({ pokemon }: { pokemon: BasePokemon[] }) => {
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
