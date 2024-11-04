import { createSelector } from '@reduxjs/toolkit';

export const selectPokemonById = (pokemonId) =>
  createSelector(
    (state) => state.pokemon.list,
    (pokemon) => pokemon.find((el) => el.id === pokemonId)
  );