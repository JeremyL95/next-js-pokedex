import { useState, useEffect } from 'react';
import axios from 'axios';

const pokemonBaseUrl = "https://pokeapi.co/api/v2";

export function usePokemonData() {
    const [loading, setLoading] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [allPokemon, setAllPokemon] = useState([]);
    const [pokemonListDetails, setPokemonListDetails] = useState([]);
    const [activePokemon, setActivePokemon] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // fetch pokemon list
    async function fetchPokemon(page = 1) {
        setLoading(true);

        try {
            const offset = (page - 1) * 50;
            const res = await axios.get(`${pokemonBaseUrl}/pokemon?limit=20&offset=${offset}`);

            setPokemonList((prev) => [...prev, ...res.data.results]);
            setCurrentPage(1);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // fetch all pokemon
    async function fetchAllPokemon() {
        setLoading(true);
        try {
            const res = await axios.get(`${pokemonBaseUrl}/pokemon?offset=1118`);
            setAllPokemon(res.data.results);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // fetch pokemon details
    async function fetchPokemonDetails() {
        setLoading(true);

        try {
            const details = await Promise.all(
                pokemonList.map(async (pokemon) => {
                    const res = await axios.get(pokemon.url);
                    return res.data;
                })
            )

            setPokemonListDetails(details);
        } catch (error) {
            console.log("Error fetching pokemon details", error);
        } finally {
            setLoading(false);
        }
    }

    // fetch pokemon by name
    async function fetchPokemonByName(pokemonID) {
        setLoading(true);
        try {
            const res = await axios.get(`${pokemonBaseUrl}/pokemon/${pokemonID}`);
            setActivePokemon(res.data);
            return res.data;

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPokemon();
        fetchAllPokemon();
    }, []);

    useEffect(() => {
        if (pokemonList.length > 0) {
            fetchPokemonDetails();
        }
    }, [pokemonList]);

    return { fetchPokemon, loading, pokemonList, pokemonListDetails, fetchPokemonByName, activePokemon }
}