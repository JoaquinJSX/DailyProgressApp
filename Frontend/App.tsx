import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';

function App() {

  document.title = 'MyDailyProgress';

  const [users, setUsers] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/users')
        .then(res => res.json())
        .then(data => {
            setUsers(data);
            console.log(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}, []);

  return (
    <div className="app_container">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogIn users={users} setUserLoggedIn={setUserLoggedIn}/>} />
          <Route path='/sign-up' element={<SignUp users={users} setUsers={setUsers}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
