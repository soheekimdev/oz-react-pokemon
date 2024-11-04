import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemons } from '../store/pokemonSlice';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

function Main() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    console.log('Main: Current state:', { list, status, error });
  }, [list, status, error]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemons());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <ul className="flex gap-4 flex-wrap p-6">
      {list.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </ul>
  );
}

export default Main;
