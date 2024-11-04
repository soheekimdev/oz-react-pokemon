import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteButton from './FavoriteButton';
import { useState } from 'react';

function PokemonCard({ pokemon }) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (!pokemon) return null;

  return (
    <li className="flex flex-col items-center gap-2 relative p-4 border rounded-lg hover:shadow-lg transition-shadow">
      <FavoriteButton pokemonId={pokemon.id} />
      <Link to={`/detail/${pokemon.id}`}>
        {isImageLoading ? <div className="flex items-center justify-center w-[128px] h-[128px]">로딩 중...</div> : null}
        <img
          src={pokemon.front}
          alt={pokemon.name}
          className="w-32 h-32 object-contain"
          style={{ display: isImageLoading ? 'none' : 'block' }}
          onLoad={() => setIsImageLoading(false)}
        />
        <p className="text-center">{pokemon.name}</p>
      </Link>
    </li>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    front: PropTypes.string.isRequired,
  }).isRequired,
};

export default React.memo(PokemonCard);
