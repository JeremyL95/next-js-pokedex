"use client";
import Header from '@/components/Header';
import { useGlobalContext } from '@/context/globalContext';
import PokemonCard from '@/components/PokemonCard'
// nextjs, tailwind CSS, typescript, pokeAPI, prisma, auth0

export default function Home() {
  const { loading, pokemonListDetails } = useGlobalContext();

  if (loading) return <div>Loading ...</div>

  return (
    <main className="max-w-[1400px] mx-auto">
      <Header />

      <section>
        {/* search form */}
      </section>

      <section className="min-h-[90dvh]">
        <ul className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-5">
          {!loading && pokemonListDetails.map((pokemonListDetail: any, index: number) => {
            // console.log(pokemonListDetail)
            return <PokemonCard key={index} pokemon={pokemonListDetail} />
          })}

        </ul>
      </section>
    </main>
  );
}
