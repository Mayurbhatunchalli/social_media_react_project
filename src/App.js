import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication/Authentication';
import Homepage from './homepage/Homepage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfileAction } from './Redux/Auth/auth.action';
import Message from './Message/Message';

function App() {

  const user = useSelector(store => store.auth.user);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if(jwt && isLoggedIn) {
      dispatch(getUserProfileAction(jwt));
    }
    
  }, []);


  return (
    <div>
      <Routes>
        <Route path='/*' element={user ? <Homepage /> : <Authentication />} />
        {/* <Route path='/*' element={<Authentication />} /> */}
      </Routes>
    </div>
  );
}

export default App;
