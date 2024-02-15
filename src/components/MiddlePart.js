import { Avatar, Card, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import StoryCircle from './StoryCircle';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
import CreatePostModel from './CreatePosts/CreatePostModel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostsAction } from '../Redux/Post/post.action';

const story = [1, 1, 1, 1, 1];

const MiddlePart = () => {

  const [openPostCreateModal, setOpenPostCreateModal] = useState(false);

  const posts = useSelector(store => store.post.posts);
  const user = useSelector(store => store.auth.user);
  const comment = useSelector(store => store.post);
  const deleteStatus = useSelector(store => store.post.deleteStatus);

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenPostCreateModal(false);
  }

  const jwt = localStorage.getItem("jwt");

  const handleCreatePostModel = () => {
    setOpenPostCreateModal(true);
  }

  useEffect(() => {
    dispatch(getAllPostsAction(jwt))
  }, [comment.newComment, deleteStatus])

  return (
    <div className='px-20'>
      <section className='flex items-center p-5 rounded-b-md'>
        <div className='flex flex-col items-center mr-4 cursor-pointer'>
          <Avatar sx={{ width: "3rem", height: "3rem" }} >
            <AddIcon sx={{ fontSize: "3rem" }} />

          </Avatar>
          <p>New</p>
        </div>
        {story.map((item) => <StoryCircle key={item.id}/>)}
      </section>

      <Card className='p-5 mt-5'>
        <div className='flex justify-between'>
          <Avatar src={user.profilePicture} />
          <input onClick={handleCreatePostModel}
            readOnly className='outline-none w-[85%]
          rounded-full px-5 bg-transparent border-[#3b4054] border' type='text' />
        </div>
        <div className='flex justify-center space-x-9 mt-5'>
          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleCreatePostModel}>

              <ImageIcon />

            </IconButton>

            <span>Media</span>
          </div>

          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleCreatePostModel}>

              <VideocamIcon />

            </IconButton>

            <span>Video</span>
          </div>

          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleCreatePostModel}>

              <ArticleIcon />

            </IconButton>

            <span>Article</span>
          </div>

        </div>
      </Card>

      <div className='mt-5 space-y-5'>
        {posts.map((item) => <PostCard key={item.id} item={item} />)}
      </div>

      <div>
        <CreatePostModel item={user} handleClose={handleClose} open={openPostCreateModal} />
      </div>

    </div>
  )
}

export default MiddlePart