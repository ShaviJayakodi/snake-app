
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TemporaryDrawer from './components/TemporaryDrawer';
import Registration from './components/Registration';
import Login from './components/Login';
import Search from './components/Search';




function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/snakeapp" element={<TemporaryDrawer />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/search" element={<Search />} />


        </Routes>
      </BrowserRouter>
  );
}

export default App;
