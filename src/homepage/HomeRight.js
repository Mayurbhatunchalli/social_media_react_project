import React, { useEffect } from 'react'
import SearchUser from '../components/SearchUser'
import PopularUserCard from './PopularUserCard';
import { Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { allUsersProfileAction } from '../Redux/Auth/auth.action';

const HomeRight = () => {

  const users= useSelector(store => store.auth.users);
  const user= useSelector(store => store.auth.user);

  const dispatch = useDispatch();

  //const filteredUsers = auth.users.filter(item => item.id !== auth.user.id);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(allUsersProfileAction(jwt))
  }, [])

  return (
    <div className='pr-1'>

      <SearchUser />

      <Card className='p-5'>
        <div className='flex justify-between py-5 items-center '>
          <p className='font-semibold opacity-70'>Suggestions for you</p>
          <p className='text-xs font-semibold opacity-95'>View All</p>
        </div>

        <div className=''>
          {users.filter(item => item.id !== user.id).map((item) => <PopularUserCard key={item.id} item={item} />)}
        </div>
      </Card>
    </div>
  )
}

export default HomeRight