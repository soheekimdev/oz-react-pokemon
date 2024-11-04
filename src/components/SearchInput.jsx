import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
  const searchRef = useRef('');
  const navigate = useNavigate();

  return (
    <label className="flex-1 flex items-center gap-3">
      <span className="text-lg">🔎</span>
      <input
        type="search"
        ref={searchRef}
        className="w-60 p-2 border rounded-md"
        onChange={(event) => navigate(`/search?pokemon=${event.target.value}`)}
      />
    </label>
  );
}

export default SearchInput;
