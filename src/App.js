import React, {useState} from 'react';

import Login from './main/components/Login'
import Signup from './main/components/Signup'
import Main from './main/components/Main'


import './App.css';

function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(0);
  const [userInfo,setUserInfo] = useState(null);
  const [newSignIn,setNewSignIn] = useState(0);

  return (
        isLoggedIn ? (
          <Main/>
        )
         :newSignIn ? <Signup setNewSignIn={setNewSignIn} />

         :(<Login setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} setNewSignIn={setNewSignIn} />)
  )
}

export default App;
