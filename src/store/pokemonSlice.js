import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

// 비동기 액션 생성
export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async () => {
  const response = await axios.get(`${API_URL}?offset=0&limit=151`);
  const results = response.data.results;

  // 각 포켓몬의 상세 정보 가져오기
  const detailsPromises = results.map((pokemon) => axios.get(pokemon.url));

  const detailsResponses = await Promise.all(detailsPromises);

  // 필요한 데이터만 추출
  return detailsResponses.map((response) => ({
    id: response.data.id,
    name: response.data.name,
    image: response.data.sprites.front_default,
    types: response.data.types.map((type) => type.type.name),
  }));
});

// Slice 생성
export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    list: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // 찜하기 추가/제거
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default pokemonSlice.reducer;
