import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './components/Login/login'
import {UserHome} from './components/UserHome/userhome'
import {AdminHome} from './components/AdminHome/adminhome'

function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [username, setUsername] = useState(false)

  useEffect(() => {
    // getConnection().then(result => console.log(result))
  })

  return (
    <div className="App">
      {isLogin && <Login setIsAdmin = {setIsAdmin} setIsLogin={setIsLogin} setUsername={setUsername}/>}
      {!isLogin && !isAdmin && <UserHome username={username}/>}
      {!isLogin && isAdmin && <AdminHome/>}      
    </div>
  );
}

export default App;
