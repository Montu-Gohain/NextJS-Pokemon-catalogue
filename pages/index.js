import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch(
        "https://jherr-pokemon.s3-us-west-1.amazonaws.com/index.json"
      );

      setPokemon(await resp.json());
    }
    getPokemon();
  }, []);

  return (
    <div className={styles.main}>
      <Head>
        <title>Pokemon-catelouge</title>
        <link
          rel='icon'
          type='image/x-icon'
          href='https://web-dev.imgix.net/image/vS06HQ1YTsbMKSFTIPl2iogUQP73/KAOmqplghJT2PrJlOgZ5.png?auto=format'></link>
      </Head>
      <header className={styles.heading}>
        <h1 id={styles.csr_title} className={styles.header_title}>
          Pokemon List in CSR
        </h1>
        <button className={styles.btnssr}>
          <Link href='/indexSSR' className={styles.links}>
            SSR
          </Link>
        </button>
        <button className={styles.btnssg}>
          <Link href='/indexSSG' className={styles.links}>
            SSG
          </Link>
        </button>
      </header>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <img
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                alt={pokemon.name}
              />
              <h5>{pokemon.name}</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
