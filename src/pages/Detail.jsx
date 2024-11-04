import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPokemons } from '../store/pokemonSlice';
import { selectPokemonById } from '../store/pokemonSelector';
import IcBack from '../assets/image/arrow-left.svg';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import FavoriteButton from '../components/FavoriteButton';

function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.pokemon);
  const pokemon = useSelector((state) => selectPokemonById(Number(id))(state));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemons());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!pokemon) return <div className="p-6 text-gray-500">포켓몬을 찾을 수 없습니다.</div>;

  const details = [
    { label: '이름', value: pokemon.name },
    { label: '타입', value: pokemon.types.map((type) => type.korean).join(', ') },
    { label: '키', value: `${pokemon.height}m` },
    { label: '몸무게', value: `${pokemon.weight}kg` },
    { label: '설명', value: pokemon.description },
  ];

  return (
    <div className="m-6 p-6 border rounded-lg">
      <button onClick={() => navigate(-1)} aria-label="뒤로 가기">
        <img src={IcBack} alt="" className="w-6 h-6" />
      </button>
      <h2 className="flex items-center gap-1 text-xl font-bold">
        <span>
          No.{id.padStart(3, 0)} {pokemon.name}
        </span>
        <FavoriteButton pokemonId={pokemon.id} isInline={true} />
      </h2>
      <div className="flex">
        <img src={pokemon.front} alt={`${pokemon.name} 앞모슴`} className="w-32 h-32 object-contain" />
        <img src={pokemon.back} alt={`${pokemon.name} 뒷모습`} className="w-32 h-32 object-contain" />
      </div>
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
