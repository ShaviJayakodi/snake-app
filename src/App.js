import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TemporaryDrawer from './components/TemporaryDrawer';
import Login from './components/Login';
import Search from './components/Search';
import AdminRegistration from './components/AdminRegistration';
import SnakeCatcherRegistration from './components/SnakeCatcherRegistration';
import PendingApprovals from './components/PendingApprovals';
import ChangePassword from './components/ChangePassword';
import Home from './components/Home';
import SnakeIdentificationPage from './components/SnakeIdentificationPage';
import Footer from './components/Footer';
import SearchSnakeCatcher from './components/SearchSnakeCatcher';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/snakeIdentification" element={<SnakeIdentificationPage />} />
        <Route path="/searchSnakeCatcher" element={<SearchSnakeCatcher />} />
        <Route path="/adminRegistration" element={<AdminRegistration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/snakeCatcherRegistration" element={<SnakeCatcherRegistration />} />
        <Route path="/PendingApprovals" element={<PendingApprovals />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
