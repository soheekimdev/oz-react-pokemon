import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

function Main() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPokemonList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}?limit=151&offset=0`);
      console.log(response);
      const results = response.data.results;

      // 각 포켓몬의 상세 정보 가져오기
      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const detailResponse = await axios.get(pokemon.url);
          return {
            id: detailResponse.data.id,
            name: detailResponse.data.name,
            image: detailResponse.data.sprites.front_default,
          };
        })
      );

      setPokemonList(pokemonData);
    } catch (err) {
      setError('포켓몬 데이터를 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul className="flex gap-4 flex-wrap p-4">
      {pokemonList.map((pokemon) => (
        <li
          key={pokemon.id}
          className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:shadow-lg transition-shadow"
        >
          <Link to={`/detail/${pokemon.id}`}>
            <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32 object-contain" />
            <p className="text-center capitalize">{pokemon.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Main;
