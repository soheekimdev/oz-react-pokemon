import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { favoriteSlice } from '../store/favoriteSlice';

function FavoriteButton({ pokemonId, isInline }) {
  const isFavorite = useSelector((state) => state.favorite.some((item) => item === pokemonId));
  const dispatch = useDispatch();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        dispatch(
          isFavorite
            ? favoriteSlice.actions.removeFromFavorite({ pokemonId })
            : favoriteSlice.actions.addToFavorite({ pokemonId })
        );
      }}
      className={`flex items-center justify-center ${isInline ? '' : 'absolute top-3 right-3'} w-6 h-6 text-2xl`}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  );
}

export default FavoriteButton;

FavoriteButton.propTypes = {
  pokemonId: PropTypes.number.isRequired,
  isInline: PropTypes.bool,
};
