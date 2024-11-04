import { useRef } from 'react';

function Search() {
  const searchRef = useRef('');

  return (
    <div className="flex-1 flex gap-3">
      🔎
      <input type="search" ref={searchRef} className="border" />
    </div>
  );
}

export default Search;
