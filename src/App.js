import React, {useState} from 'react';

import SelectMov from './main/compoents/SelectMov'
import Login from './main/compoents/Login'
import Signup from './main/compoents/Signup'

import './App.css';

function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(0);
  const [userInfo,setUserInfo] = useState(null);
  const [newSignIn,setNewSignIn] = useState(0);

  return (
        isLoggedIn ? (
          <SelectMov userInfo={userInfo} />
        )
         :newSignIn ? <Signup setNewSignIn={setNewSignIn} />

         :(<Login setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} setNewSignIn={setNewSignIn} />)
  )
}

export default App;
