import { createSelector } from '@reduxjs/toolkit';

export const selectPokemonById = (pokemonId) =>
  createSelector(
    (state) => state.pokemon.list,
    (pokemon) => pokemon.find((el) => el.id === pokemonId)
  );

export const selectPokemonByRegExp = (reg) =>
  createSelector(
    (state) => state.pokemon.list,
    (pokemon) => pokemon.filter((el) => el.name.match(reg))
  );

export const selectFavoritePokemons = createSelector(
  (state) => state.pokemon.list,
  (state) => state.favorite,
  (pokemon, favorite) => {
    return pokemon.filter((el) => favorite.includes(el.id));
  }
);
