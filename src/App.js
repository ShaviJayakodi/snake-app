import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import UpdateSnakeCatcher from './components/UpdateSnakeCatcher';
import UpdateAdmin from './components/UpdateAdmin';
import SnakeCatchersList from './components/SnakeCatchersList';
import SnakeDataForm from './components/SnakeDataForm';
import SnakeCatcherListByCity from './components/SnakeCatcherListByCity'


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
        <Route path="/pendingApprovals" element={<PendingApprovals />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/updateSnakeCatcher" element={<UpdateSnakeCatcher />} />
        <Route path="/updateAdmin" element={<UpdateAdmin />} />
        <Route path="/snakeCatchersList" element={<SnakeCatchersList />} />
        <Route path="/snakeDataForm" element={<SnakeDataForm />} />
        <Route path="/snakeCatcherListByCity" element={<SnakeCatcherListByCity />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
