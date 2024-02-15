import React, { useEffect, useState } from 'react'
import Post1 from './Post1.jfif'
import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material'
import PostCard from '../Post/PostCard';
import UserReelsCard from '../Post/UserReelsCard';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from './ProfileModal';
import { getUserPostsAction, getUserSavedPostsAction } from '../Redux/Post/post.action';
import Profile_Photo from './Profile_Photo.jfif'

const Profile = () => {

  const tabs = [
    { value: "post", name: "Post" },
    { value: "reels", name: "Reels" },
    { value: "saved", name: "Saved" }
  ];

  const user = useSelector(store => store.auth.user);

  const posts = useSelector(store => store.post.posts);

  const savedPosts = useSelector(store => store.post.savedPosts);

  const deleteStatus = useSelector(store => store.post.deleteStatus);

  const reels = [1, 1, 1, 1];

  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");

  const [value, setValue] = useState('post');

  const [open, setOpen] = useState(false);

  const handleOpenProfileModel = () => {
    setOpen(true);
    console.log("Open post model");
  }

  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    dispatch(getUserPostsAction(user?.id,jwt))
  },[, deleteStatus])

  useEffect(()=>{
    dispatch(getUserSavedPostsAction(user?.id,jwt))
  },[])

  console.log("Posts", posts);

  return (
    <Card className='my-10 w-[70%]'>
      <div className='rounded-md'>
        <div className='h-[15rem]'>

          <img className='w-full h-full rounded-t-md' src={Post1} alt='' />

        </div>

        <div className='px-5 flex justify-between itens-start mt-5 h-[5rem]'>

          <Avatar className='transform -translate-y-16'
            sx={{ width: "8rem", height: "8rem" }} src={user.profilePicture} />

          {true ? <Button onClick={handleOpenProfileModel}
            sx={{ borderRadius: "20px" }} variant='outlined' size="small">Edit Profile</Button> :
            <Button variant='outlined'>Follow</Button>}

        </div>

        <div className='p-5'>
          <div className='py-1 font-bold text-xl'>
            <h1>{user?.firstName + " " + user?.lastName}</h1>
          </div>

          <p>@{user?.firstName.toLowerCase() + "_" + user?.lastName.toLowerCase()}</p>

          <div className='flex gap-4 items-center py-3'>

            <span>{posts.length} Posts</span>
            <span>{user?.followers.length} Followers</span>
            <span>{user?.followings.length} Followings</span>

          </div>

          <div>
            <p>Code with Mayur - Social Media Application</p>
          </div>
        </div>

        <section>
          <Box sx={{
            width: '100%', borderBottom: 1,
            borderColor: "divider"
          }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item) => <Tab key={item.id} value={item.value} label={item.name} />)}

            </Tabs>
          </Box>

          <div className='flex justify-center'>

            {
              value === "post" ? <div className='space-y-5 w-[70%] my-10'>
                {posts.map((item) => <div className='border border-slate-100 rounded-md'>
                  <PostCard item={item}/> </div>)} </div>

                : value === 'reels' ? <div className='flex justify-center gap-2 flex-wrap my-10'>
                  {reels.map((item) => <UserReelsCard />)} </div>

                  : value === 'saved' ? <div className='space-y-5 w-[70%] my-10'>
                    {savedPosts.map((item) => <div className='border border-slate-100 rounded-md'>
                    <PostCard item={item}/> </div>)} </div>

                    : ""
            }

          </div>

        </section>

        <div>
          <ProfileModal user={user} handleClose={handleClose} open={open} />
        </div>

      </div>

    </Card>
  )
}

export default Profile