import React from 'react';
import { usePokemonData } from './usePokemonData'

const GlobalContext = React.createContext();

export function GlobalContextProvider({ children }) {
    const { loading, fetchPokemon, pokemonList, pokemonListDetails } = usePokemonData();

    return (
        <GlobalContext.Provider value={{ loading, fetchPokemon, pokemonList, pokemonListDetails }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return React.useContext(GlobalContext);
}