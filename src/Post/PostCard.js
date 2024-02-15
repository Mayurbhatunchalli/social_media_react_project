import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction } from '../Redux/Comment/comment.action';
import { deleteUserPostsAction, likePostAction } from '../Redux/Post/post.action';
import { isLikedByReqUser } from '../utils/isLikedByReqUser';

const PostCard = ({ item }) => {

    const [showComments, setShowComments] = useState(false);

    const user = useSelector(store => store.auth.user);
    const comment = useSelector(store => store.post);

    const dispatch = useDispatch();

    const inputClearRef = useRef();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const jwt = localStorage.getItem("jwt");

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleShowComment = () => {
        setShowComments(!showComments);
    }

    const handleLikeButton = () => {
        dispatch(likePostAction(item.id));
    }

    const handleCreateComment = (content) => {

        const reqData = {
            postId: item.id,
            data: {
                content
            }
        }
        dispatch(createCommentAction(reqData));

    }

    const handleClick = () => {
        console.log("Handle click");
    }

    const handleDeletePosts = () => {
        dispatch(deleteUserPostsAction(item.id, jwt));
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    useEffect(() => {
        if (inputClearRef.current) {
            inputClearRef.current.value = '';
        }
    }, [comment.newComment])

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {item.user.firstName.charAt(0)}
                    </Avatar>
                }
                action={
                    <div>
                        <IconButton aria-label="settings" onClick={handleOpen}>
                            <MoreVertIcon />
                        </IconButton>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClick}>Edit</MenuItem>
                            <MenuItem onClick={handleDeletePosts}>Delete</MenuItem>
                        </Menu>
                    </div>

                }
                title={item.user.firstName + " " + item.user.lastName}
                subheader={"@" + item.user.firstName.toLowerCase() + "_" + item.user.lastName.toLowerCase()}
            />

            <CardMedia
                component="img"
                height="194"
                image={item.image}
                alt="Paella dish"
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {item.caption}
                </Typography>
            </CardContent>

            <CardActions className='flex justify-between' disableSpacing>
                <div>
                    <IconButton onClick={handleLikeButton}>
                        {isLikedByReqUser(user.id, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton>
                        <ShareIcon />
                    </IconButton>
                    <IconButton onClick={handleShowComment}>
                        <ChatBubbleIcon />
                    </IconButton>

                </div>

                <div>
                    <IconButton>
                        {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </div>

            </CardActions>

            {showComments && <section>
                <div className='flex items-center space-x-5 mx-5 my-3'>
                    <Avatar sx={{}} />
                    <input ref={inputClearRef} onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleCreateComment(e.target.value);
                        }
                    }}
                        className='w-full outline-none
                        rounded-full px-5 py-2 bg-transparent border border-[#3b4054] border' type='text'
                        placeholder='Write your comment...!' />
                </div>

                <Divider />
                <div className='mx-3 space-y-2 my-5 text-xs'>

                    {item.comments?.map((comment) => <div className='flex items-center space-x-5'>

                        <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}>
                            {comment.user.firstName[0]}
                        </Avatar>

                        <p>{comment.content}</p>

                    </div>)}

                </div>

            </section>}

        </Card>
    )
}

export default PostCard