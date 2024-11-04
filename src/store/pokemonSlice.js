import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';
const SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

// 한글 타입 매핑
const TYPE_MAPPING = {
  normal: '노말',
  fire: '불꽃',
  water: '물',
  electric: '전기',
  grass: '풀',
  ice: '얼음',
  fighting: '격투',
  poison: '독',
  ground: '땅',
  flying: '비행',
  psychic: '에스퍼',
  bug: '벌레',
  rock: '바위',
  ghost: '고스트',
  dragon: '드래곤',
  dark: '악',
  steel: '강철',
  fairy: '페어리',
};

// 전체 포켓몬 데이터 가져오기 액션
export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async () => {
  const response = await axios.get(`${POKEMON_URL}?offset=0&limit=20`);
  const results = response.data.results;

  // 각 포켓몬의 상세 정보 가져오기
  const detailsPromises = results.map(async (pokemon) => {
    const id = pokemon.url.split('/')[6];

    const [pokemonResponse, speciesResponse] = await Promise.all([
      axios.get(`${POKEMON_URL}${id}`),
      axios.get(`${SPECIES_URL}${id}`),
    ]);

    const name = speciesResponse.data.names.find((name) => name.language.name === 'ko')?.name;
    const description = speciesResponse.data.flavor_text_entries.find(
      (text) => text.language.name === 'ko'
    )?.flavor_text;

    // 필요한 데이터만 추출
    return {
      id: pokemonResponse.data.id,
      name: name || pokemonResponse.data.name,
      types: pokemonResponse.data.types.map((type) => ({
        original: type.type.name,
        korean: TYPE_MAPPING[type.type.name] || type.type.name,
      })),
      height: pokemonResponse.data.height / 10, // m 단위로 변환
      weight: pokemonResponse.data.weight / 10, // kg 단위로 변환
      image: pokemonResponse.data.sprites.front_default,
      description: description,
    };
  });

  return await Promise.all(detailsPromises);
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

export default pokemonSlice;
