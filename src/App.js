import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/login'

function App() {
  useEffect(() => {
    // getConnection().then(result => console.log(result))
  })

  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
