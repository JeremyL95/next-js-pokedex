import Image from "next/image";
import { useRouter } from "next/navigation";

const TYPECOLOR = {
    normal: "#9e9e6d",
    fighting: "#b82924",
    flying: "#9e85ee",
    poison: "#c461e2",
    ground: "#dcb85d",
    rock: "#af9631",
    bug: "#9eaf1e",
    ghost: "#654e8d",
    steel: "#afafca",
    fire: "#ee732b",
    water: "#5d86ee",
    grass: "#47D1AF",
    electric: " #f7c72b",
    psychic: "#f74d7d",
    ice: "#8dd3d3",
    dragon: "#6332f7",
    fairy: "##eeadb4",
}

interface PokemonCardProps {
    pokemon: any;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    const router = useRouter();
    const pokemonType = `${pokemon?.types[0]?.type?.name}`;
    const pokemonBgColor = `${TYPECOLOR[pokemonType]}`;

    // console.log(pokemon);

    return (
        <li key={pokemon?.id} style={{ backgroundColor: `${pokemonBgColor}` }} className="rounded-lg p-5 relative overflow-hidden cursor-pointer" onClick={() => router.push(`/pokemon/${pokemon?.name}`)}>
            <div className="flex justify-end gap-2 mt-2 mb-5">
                <button>
                    saved
                </button>

                <button>
                    bookmark
                </button>
            </div>

            <h4>
                #{pokemon['id'].toString().padStart(3, "0")}
            </h4>

            <h2 className="text-xl font-bold capitalize my-2">
                {pokemon?.name}
            </h2>

            <span className="absolute bottom-5 right-5 lg:bottom-0 lg:right-0 z-10">
                <Image src={pokemon?.sprites?.other["official-artwork"]?.front_default || pokemon?.sprites?.front_default} width={120} height={120} alt="pokemon" className="object-contain" />
            </span>

            <span className="absolute bottom-0 right-0 opacity-15">
                <Image src="/pokeball-bg.webp" width={150} height={150} alt="pokeball background" />
            </span>

            <span className="flex just items-center gap-2">
                {pokemon?.types?.map((type: any, index: number) => {
                    return (
                        <span className="bg-white/15 rounded-lg p-2 min-w-[60px] capitalize text-center" key={index}>{type.type.name}</span>
                    )
                })}
            </span>
        </li>
    )
}