import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import User from './pages/User';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/User" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
