import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './pages/Main';
import Detail from './pages/Detail';
import Search from './pages/Search';
import Favorite from './pages/Favorite';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
