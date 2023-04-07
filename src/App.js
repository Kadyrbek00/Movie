import React, { useEffect } from 'react';
import HomePage from './HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './app/features/userSlice';
import ProfilePage from './ProfilePage/ProfilePage';
import InitialPage from './InitialPage/InitialPage';
import ChangePassword from './ChangePass/ChangePass';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          }),
        )
        console.log(userAuth);
      } else {
        dispatch(logout())
      }
    })
    return unsubscribe
  }, [dispatch])

  return (
    <div className="App">

      <Router>
        <Routes>
          {!user ? (
            <Route path='/' element={<InitialPage />} />
          ) : (
            <>
              <Route exact path='/' element={<HomePage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/changePassword' element={<ChangePassword />} />
            </>
          )}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
