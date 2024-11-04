import { Link } from 'react-router-dom';
import Search from './Search';

function Header() {
  return (
    <header className="flex items-center justify-between gap-5 flex-wrap min-h-14 p-4">
      <h1 className="text-xl font-bold">
        <Link to="/">포켓몬 도감</Link>
      </h1>
      <wbr />
      <Search />
      <ul className="flex gap-6">
        <li>
          <Link to="/favorite">찜 목록</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
