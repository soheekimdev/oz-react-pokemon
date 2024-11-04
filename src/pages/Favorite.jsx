import { useSelector } from 'react-redux';
import { selectFavoritePokemons } from '../store/pokemonSelector';
import PokemonCard from '../components/PokemonCard';

function Favorite() {
  const pokemon = useSelector(selectFavoritePokemons);

  return (
    <ul className="flex gap-4 flex-wrap p-6">
      {pokemon.map((el) => (
        <PokemonCard key={el.id} pokemon={el} />
      ))}
    </ul>
  );
}

export default Favorite;
