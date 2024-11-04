import { getRegExp } from 'korean-regexp';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { selectPokemonByRegExp } from '../store/pokemonSelector';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { useEffect } from 'react';
import { fetchPokemons } from '../store/pokemonSlice';
import { useDispatch } from 'react-redux';

function Search() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.pokemon);

  const [searchParams] = useSearchParams();
  const param = searchParams.get('pokemon') || '';

  const reg = param ? getRegExp(param) : null;
  const filteredPokemons = useSelector(selectPokemonByRegExp(reg));

  console.log('검색어:', param);
  console.log('검색 결과:', filteredPokemons);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemons());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!param) return <div className="p-6 text-gray-500">검색어를 입력해주세요</div>;
  if (filteredPokemons.length === 0) return <div className="p-6 text-gray-500">검색 결과가 없습니다</div>;

  return (
    <ul className="flex gap-4 flex-wrap p-6">
      {filteredPokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </ul>
  );
}

export default Search;
