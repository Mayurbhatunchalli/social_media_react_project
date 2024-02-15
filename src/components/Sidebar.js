import React from 'react'
import { navigationMenu } from './SideBarNavigation'
import { Avatar, Button, Card, Divider, Menu, MenuItem } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../Redux/Auth/auth.action';


const Sidebar = () => {

  const navigate = useNavigate();
  const user = useSelector(store => store.auth.user);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.setItem("isLoggedIn", false);
    dispatch(logoutAction());
    navigate("/logout");
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleNavigate = (item) => {
    if(item.title === "Profile") {
      navigate(`/profile/${user?.id}`)
    } else {
      navigate(item.path)
    }
  }

  return (
    <Card className='card h-screen flex flex-col justify-between py-5'>
      <div className='space-y-8 pl-5'>
        <div>
          <span className='logo font-bold text-xl'>Social Media</span>
        </div>
        

        <div className='space-y-8'>
          {
            navigationMenu.map((item) =>
              <div key={item.id} onClick={() => handleNavigate(item)} className='cursor-pointer flex space-x-3 items-center'>
                {item.icon}
                <p className='text-xl'>{item.title}</p>
              </div>)
          }

        </div>

      </div>
      <div>
        <Divider />
        <div className='pl-5 flex items-center justify-between pt-5'>
          <div className='flex items-center space-x-3'>
            <Avatar src={user.profilePicture} />
            <div>
              <p className='font-bold'>{user?.firstName + " " + user?.lastName}</p>
              <p className='opacity-70'>@{user?.firstName.toLowerCase() + "_" + user?.lastName.toLowerCase()}</p>
            </div>
          </div>

          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleOpen}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

        </div>
      </div>

    </Card>
  )
}

export default Sidebar