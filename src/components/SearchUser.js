import { Avatar, Card, CardHeader } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchUserProfileAction } from '../Redux/Auth/auth.action';
import { createChat } from '../Redux/Message/message.action';
import { useLocation } from 'react-router-dom';

const SearchUser = () => {

  const location = useLocation();

  const jwt = localStorage.getItem("jwt");

  const [username, setUsername] = useState("");

  const searchUser = useSelector(store => store.auth.searchUser);

  const dispatch = useDispatch();

  const handleSearchUser = (e) => {
    setUsername(e.target.value)
    dispatch(searchUserProfileAction(username, jwt))
  }

  const handleClick = (id) => {
    console.log("Handle click ");
    if(location.pathname === "/") {
      console.log("User profile");
      //dispatch();
    } else {
      console.log("Id: ",id)
      dispatch(createChat({userId:id}))
    }
  }

  return (
    <div className='py-5 relative'>
      <input className="bg-transparent border border-[#3b4054] outline-none w-full 
    px-5 py-3 rounded-full" placeholder="Search user..." onChange={handleSearchUser} type="text" />

      {username && (
        searchUser.map((item) =>
        <Card key={item.id} className='absolute w-full z-10 top-[4.5rem] cursor-pointer'>
          <CardHeader onClick={() => {
            handleClick(item.id);
            setUsername("");
          }} avatar={<Avatar src='' />}
            title={item.firstName + " " + item.lastName}
            subheader={"@"+ item.firstName.toLowerCase() + "_" + item.lastName.toLowerCase()}>
          </CardHeader>
        </Card>))}
    </div>



  )
}

export default SearchUser