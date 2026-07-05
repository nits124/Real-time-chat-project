import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import getCurrentUser from './customHooks/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import getOtherUsers from './customHooks/getOtherUsers'
import { io } from "socket.io-client"
import { serverUrl } from './main'
import { setOnlineUsers} from './redux/userSlice'
import { socket, connectSocket, disconnectSocket } from "./socket/socket.js";

function App() {
  getCurrentUser()
  getOtherUsers()
  let { userData, socket, onlineUsers } = useSelector(state => state.user)
  let dispatch = useDispatch()

  useEffect(() => {
    if (userData) {
      const socketio = connectSocket(userData._id);

      socketio.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      return () => disconnectSocket();
    } else {
      disconnectSocket();
    }
  }, [userData]);

  return (
    <Routes>
      <Route path='/login' element={!userData ? <Login /> : <Navigate to="/" />} />
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to="/profile" />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path='/profile' element={userData ? <Profile /> : <Navigate to="/signup" />} />
    </Routes>
  )
}

export default App
