import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPokemons } from '../store/pokemonSlice';
import { selectPokemonById } from '../store/pokemonSelector';

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.pokemon);
  const pokemon = useSelector((state) => selectPokemonById(Number(id))(state));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemons());
    }
  }, [dispatch, status]);

  if (status === 'loading')
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  if (error) return <div>{error}</div>;

  if (!pokemon) return <div>포켓몬을 찾을 수 없습니다.</div>;

  const details = [
    { label: '이름', value: pokemon.name },
    { label: '타입', value: pokemon.types.map((type) => type.korean).join(', ') },
    { label: '키', value: `${pokemon.height}m` },
    { label: '몸무게', value: `${pokemon.weight}kg` },
    { label: '설명', value: pokemon.description },
  ];

  return (
    <div className="m-6 p-6 border rounded-lg">
      <h2 className="text-xl font-bold">
        No.{id.padStart(3, 0)} {pokemon.name}
      </h2>
      <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32 object-contain" />
      <ul>
        {details.map((item, index) => (
          <li key={index} className="flex gap-4 p-2 border-b text-gray-700 last:border-none">
            <p className="font-bold min-w-16">{item.label}</p>
            <p>{item.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Detail;
