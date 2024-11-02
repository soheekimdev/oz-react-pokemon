import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

// 전체 포켓몬 데이터 가져오기 액션
export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async () => {
  const response = await axios.get(`${API_URL}?offset=0&limit=20`);
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

// 포켓몬 상세 정보 가져오기 액션
export const fetchPokemonDetail = createAsyncThunk('pokemon/fetchPokemonDetail', async (id) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return {
    id: response.data.id,
    name: response.data.name,
    types: response.data.types.map((type) => type.type.name),
    stats: response.data.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
    height: response.data.height,
    weight: response.data.weight,
    abilities: response.data.abilities.map((ability) => ability.ability.name),
    image: response.data.sprites.front_default,
  };
});

// Slice 생성
export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    list: [],
    listStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    listError: null,
    currentPokemon: null,
    detailStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    detailError: null,
  },
  reducers: {
    // 찜하기 추가/제거
  },
  extraReducers: (builder) => {
    builder
      // fetchPokemons 케이스들
      .addCase(fetchPokemons.pending, (state) => {
        state.listStatus = 'loading';
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.listStatus = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.listStatus = 'failed';
        state.error = action.error.message;
      })
      // fetchPokemonDetail 케이스들
      .addCase(fetchPokemonDetail.pending, (state) => {
        state.detailStatus = 'loading';
      })
      .addCase(fetchPokemonDetail.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded';
        state.currentPokemon = action.payload;
      })
      .addCase(fetchPokemonDetail.rejected, (state, action) => {
        state.detailStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default pokemonSlice.reducer;
