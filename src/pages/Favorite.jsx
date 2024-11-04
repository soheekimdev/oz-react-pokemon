import { useSelector } from 'react-redux';
import { selectFavoritePokemons } from '../store/pokemonSelector';
import PokemonCard from '../components/PokemonCard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPokemons } from '../store/pokemonSlice';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

function Favorite() {
  const dispatch = useDispatch();
  const pokemon = useSelector(selectFavoritePokemons);
  const { status, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemons());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!pokemon) return <div className="p-6 text-gray-500">포켓몬을 찾을 수 없습니다.</div>;

  return (
    <ul className="flex gap-4 flex-wrap p-6">
      {pokemon.map((el) => (
        <PokemonCard key={el.id} pokemon={el} />
      ))}
    </ul>
  );
}

export default Favorite;
