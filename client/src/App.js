import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Tours from './pages/Tours';
import Register from './pages/Register';
import AddEditTour from './pages/AddEditTour';
import SingleTour from './pages/SingleTour';
import Dashboard from './pages/Dashboard';
import TagTours from './pages/TagTours';
import Category from './pages/Category';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import { setUser } from './redux/features/authSlice';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [socket, setSocket] = useState(null);

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  useEffect(() => {
    setSocket(io(process.env.REACT_APP_SOCKET_HOST));
  }, []);

  useEffect(() => {
    socket?.emit('newUser', {
      userId: user?.result?._id,
      userName: user?.result?.name,
    });
  }, [socket, user]);

  return (
    <Router>
      <div className="App">
        <Header socket={socket} />

        <ToastContainer />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/tags/:tag" element={<TagTours />} />
          <Route path="/tours/category/:category" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/add-tour"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-tour/:_id"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />

          <Route path="/tour/:_id" element={<SingleTour />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile/:_id"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
