'use client';
import React from 'react';
import Header from '@/components/Header';
import { useGlobalContext } from '@/context/globalContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IoArrowBack } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

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

interface Props {
    params: {
        id: string
    }
}

export default function Page({ params }: Props) {
    const [activeTab, setActiveTab] = useState(false);
    const router = useRouter();
    const { id } = React.use(params);
    const { fetchPokemonByName, activePokemon } = useGlobalContext();

    const pokemonType = `${activePokemon?.types[0]?.type?.name}`
    const pokemonBgColor = `${TYPECOLOR[pokemonType]}`

    useEffect(() => {
        fetchPokemonByName(id);
    }, [id])

    console.log(activePokemon)

    return (
        <>
            <Header />

            <main style={{ backgroundColor: `${pokemonBgColor}` }}>
                <div className="p-3">
                    <div className="w-full flex items-center justify-between">
                        <span onClick={() => router.push('/')}>
                            <IoArrowBack color={"#FFF"} size={24} />
                        </span>
                        <FaRegHeart color={"#FFF"} size={24} />
                    </div>

                    <div className="mt-8">
                        <h3>
                            #{activePokemon?.id.toString().padStart(3, "0")}
                        </h3>

                        <h2 className="capitalize text-2xl font-bold mt-1 mb-4">
                            {activePokemon?.name}
                        </h2>

                        <span className="flex gap-2 min-w-[60px] rounded-md">
                            {activePokemon?.types?.map((type: any, index: number) => {
                                return (
                                    <span className="bg-white/15 bg-opacity-30 rounded-lg p-2 min-w-[60px] capitalize text-center" key={index}>{type.type.name}</span>
                                )
                            })}
                        </span>
                    </div>

                    <div className="w-full flex justify-center items-center mb-[-30px]">
                        <Image
                            src={activePokemon?.sprites?.other["official-artwork"]?.front_default || activePokemon?.sprites?.front_default}
                            width={200} height={200}
                            alt="pokemon" />
                    </div>
                </div>

                <div className="w-full h-[80vh] bg-white rounded-tl-xl rounded-tr-xl">
                    {/* tab */}
                    <div className="flex gap-10 justify-center items-center text-gray-500 capitalize font-medium pt-5">
                        <h3 className={`${activeTab ? 'text-gray-500' : 'text-black'}`}
                            onClick={(prev) => setActiveTab(!prev)}>about</h3>
                        <h3>stats</h3>
                        <h3>evolution</h3>
                    </div>
                </div>
            </main>
        </>
    )
}