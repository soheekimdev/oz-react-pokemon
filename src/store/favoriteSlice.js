import { createSlice } from '@reduxjs/toolkit';

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: [1, 4, 7],
  reducers: {
    addToFavorite(state, action) {
      state.push(action.payload.pokemonId);
    },
    removeFromFavorite(state, action) {
      const index = state.indexOf(action.payload.pokemonId);
      if (index !== -1) state.splice(index, 1);
    },
  },
});
