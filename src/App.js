import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences';
import Login from './components/Login';
import app from './realmApp';

function App() {
  const [user, setUser] = useState();
  useEffect(()=>{
    setUser(app.currentUser);
  }, [user]);

  if(!user){
    return (
      <Login setUser={setUser}/>
    )
  }

  const logout = async () =>{
    await user.logOut();
    setUser(null);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard logout={logout} />} />
          <Route path="/preferences" element={<Preferences logout={logout} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
