import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPokemonDetail } from '../store/pokemonSlice';

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPokemon, detailStatus, detailError } = useSelector((state) => state.pokemon);

  useEffect(() => {
    console.log('Current state:', { currentPokemon, detailStatus, detailError });
  }, [currentPokemon, detailStatus, detailError]);

  useEffect(() => {
    dispatch(fetchPokemonDetail(id));
  }, [dispatch, id]);

  if (detailStatus === 'loading')
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  if (detailError) return <div>{detailError}</div>;

  if (!currentPokemon) return null;

  const liClass = 'p-2 border-b text-gray-700 last:border-none';
  const details = [
    { label: '이름', value: currentPokemon.name },
    { label: '타입', value: currentPokemon.types },
    { label: '키', value: currentPokemon.height },
    { label: '몸무게', value: currentPokemon.weight },
    { label: '능력', value: currentPokemon.abilities },
  ];

  return (
    <div className="m-6 p-6 border rounded-lg">
      <h2 className="text-xl">상세 정보</h2>
      <img src={currentPokemon.image} alt={currentPokemon.name} className="w-32 h-32 object-contain" />
      <ul>
        {details.map((item, index) => (
          <li key={index} className={liClass}>
            {item.label}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Detail;
