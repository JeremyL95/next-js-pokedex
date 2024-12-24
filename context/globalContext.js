import React from 'react';
import { usePokemonData } from './usePokemonData'

const GlobalContext = React.createContext();

export function GlobalContextProvider({ children }) {
    const { loading, fetchPokemon, pokemonList, pokemonListDetails, fetchPokemonByName, activePokemon } = usePokemonData();

    return (
        <GlobalContext.Provider value={{ loading, fetchPokemon, pokemonList, pokemonListDetails, fetchPokemonByName, activePokemon }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return React.useContext(GlobalContext);
}