
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TemporaryDrawer from './components/TemporaryDrawer';
import Login from './components/Login';
import Search from './components/Search';
import AdminRegistration from './components/AdminRegistration';
import SnakeCatcherRegistation from './components/SnakeCatcherRegistration';
import PendingApprovals from './components/PendingApprovals';




function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/snakeapp" element={<TemporaryDrawer />} />
          <Route exact path="/adminRegistration" element={<AdminRegistration />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/snakeCatcherRegistation" element={<SnakeCatcherRegistation />} />
          <Route exact path="/PendingApprovals" element={<PendingApprovals/>}/>


        </Routes>
      </BrowserRouter>
  );
}

export default App;
