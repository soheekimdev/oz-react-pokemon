import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

function Main() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPokemonList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}?offset=0&limit=151`);
      const results = response.data.results;

      // 각 포켓몬의 상세 정보 가져오기
      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const detailResponse = await axios.get(pokemon.url);
          return {
            id: detailResponse.data.id,
            name: detailResponse.data.name,
            imageUrl: detailResponse.data.sprites.front_default,
            height: detailResponse.data.height,
            weight: detailResponse.data.weight,
          };
        })
      );

      setPokemonList(pokemonData);
    } catch (error) {
      setError('포켓몬 데이터를 불러오는 데 실패했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul className="flex gap-4 flex-wrap p-4">
      {pokemonList.map((pokemon) => (
        <li
          key={pokemon.id}
          className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:shadow-lg transition-shadow"
        >
          <Link to={`/detail/${pokemon.name}`}>
            <img src={pokemon.imageUrl} alt={pokemon.name} className="w-32 h-32 object-contain" />
            <p className="text-center capitalize">{pokemon.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Main;
