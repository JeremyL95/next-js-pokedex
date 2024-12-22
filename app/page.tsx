"use client";
import Image from "next/image";
import Header from '@/components/Header';
import { useGlobalContext } from '@/context/globalContext';
// nextjs, tailwind CSS, typescript, pokeAPI, prisma, auth0

export default function Home() {
  const { loading, pokemonListDetails } = useGlobalContext();

  if (loading) return <div>Loading ...</div>

  return (
    <main>
      <Header />

      <section>
        {/* search form */}
      </section>

      <section className="min-h-[90dvh]">
        <ul className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!loading && pokemonListDetails.map((pokemonListDetail: any, index: number) => {
            console.log(pokemonListDetail)
            return (
              <li key={pokemonListDetail.id}>
                <h4>
                  {pokemonListDetail['id'].toString().padStart(3, "0")}
                </h4>
                <h2 className="">
                  {pokemonListDetail.species.name}
                </h2>
              </li>
            )
          })}

        </ul>
      </section>
    </main>
  );
}
