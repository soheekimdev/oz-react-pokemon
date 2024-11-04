import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteButton from './FavoriteButton';

function PokemonCard({ pokemon }) {
  if (!pokemon) {
    return null;
  }

  return (
    <li className="flex flex-col items-center gap-2 relative p-4 border rounded-lg hover:shadow-lg transition-shadow">
      <FavoriteButton pokemonId={pokemon.id} />
      <Link to={`/detail/${pokemon.id}`}>
        <img src={pokemon.front} alt={pokemon.name} className="w-32 h-32 object-contain" />
        <p className="text-center">{pokemon.name}</p>
      </Link>
    </li>
  );
}

export default PokemonCard;

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    front: PropTypes.string.isRequired,
  }).isRequired,
};
