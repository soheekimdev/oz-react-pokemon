import { Link } from 'react-router-dom';
import Search from './Search';

function Header() {
  return (
    <header className="flex items-center gap-16 h-14 px-4">
      <h1 className="text-xl font-bold">포켓몬 도감</h1>
      <ul className="flex gap-6">
        <li>
          <Link to="/">메인페이지</Link>
        </li>
        <li>
          <Link to="/favorite">찜 목록</Link>
        </li>
      </ul>
      <Search />
    </header>
  );
}

export default Header;
