import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export async function getServerSideProps() {
  const resp = await fetch(
    "https://jherr-pokemon.s3-us-west-1.amazonaws.com/index.json"
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

export default function HOMESSR({ pokemon }) {
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
        <h1 id={styles.ssr_title} className={styles.header_title}>
          Pokemon List in SSR
        </h1>
        <button className={styles.btncsr}>
          <Link href='/' className={styles.links}>
            CSR
          </Link>
        </button>
        <button className={styles.btnssg}>
          <Link href='/indexSSR' className={styles.links}>
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
