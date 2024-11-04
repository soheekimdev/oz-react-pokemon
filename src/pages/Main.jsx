import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemons } from '../store/pokemonSlice';

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

  if (status === 'loading')
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <ul className="flex gap-4 flex-wrap p-6">
      {list.map((pokemon) => (
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
