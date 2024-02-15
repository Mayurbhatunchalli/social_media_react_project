import { Avatar, Grid, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import WestIcon from '@mui/icons-material/West';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from '../components/SearchUser';
import '../Message/Message.css'
import UserChatCard from './UserChatCard';
import MessageCard from './MessageCard';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getAllChats } from '../Redux/Message/message.action';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import UploadToCloud from '../utils/UploadToCloud';
import SockJS from 'sockjs-client';
import Stom from 'stompjs';
import { useNavigate } from 'react-router-dom';

const Message = () => {

    const dispatch = useDispatch();

    const user = useSelector(store => store.auth.user);

    const chats = useSelector(store => store.message.chats);

    const [currentChat, setCurrentChat] = useState();
    const [messages, setMessages] = useState([]);
    const [selectedImage, setSelectedImage] = useState();
    const [loading, setLoading] = useState(false);
    const chatContainer = useRef(null);
    const inputRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllChats());
    }, [])

    useEffect(() => {
        const sock = new SockJS("http://localhost:9090/ws");
        const stomp = Stom.over(sock);
        setStompClient(stomp);

        stomp.connect({}, onConnect, onError);
    }, [])

    const onConnect = () => {
        console.log("Web socket connected");
    }

    const onError = (error) => {
        console.log("Error..", error);
    }

    useEffect(() => {
        if (stompClient && user && currentChat) {
            stompClient.subscribe("/chat/public", onMessageReceive);
            const subscription = stompClient.subscribe(`/user/${currentChat.id}/private`,
                onMessageReceive);
        }
    })

    const onMessageReceive = (payload) => {

        const receivedMessage = JSON.parse(payload.body);
        console.log("Message received from Websocket", receivedMessage);

        setMessages([...messages, receivedMessage]);
    }

    const sendMessageToServer = (newMessage) => {
        if (stompClient && newMessage) {
            stompClient.send(`/app/chat/${currentChat?.id.toString()}`
                , {}, JSON.stringify(newMessage))
        }
    }

    const handleSelectImage = async (e) => {
        setLoading(true);
        console.log("Select Image");
        const imageUrl = await UploadToCloud(e.target.file[0], "image");
        selectedImage(imageUrl);
        setLoading(false);
    }

    const handleCreateMessage = (value) => {
        const message = {
            chatId: currentChat.id,
            content: value,
            image: selectedImage
        };
        dispatch(createMessage({ message, sendMessageToServer }));
    }

    const handleOnClick = () => {
        navigate("/");
    }

    useEffect(() => {
        if (chatContainer.current && inputRef.current) {
            chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
            inputRef.current.value = '';
        }
    }, [messages])

    return (
        <div>
            <Grid container className='h-screen overflow-y-hidden'>
                <Grid item xs={3} className='px-5'>
                    <div className='flex h-full justify-between space-x-2'>
                        <div className='w-full'>
                            <div className='flex space-x-4 items-center py-5'>
                                <IconButton onClick={handleOnClick}>
                                    <WestIcon />
                                </IconButton>
                                <h1 className='text-xl font-bold'>Home</h1>

                            </div>
                            <div className='h-[83vh]'>
                                <div className=''>
                                    <SearchUser />
                                </div>

                                <div className='h-full space-y-4 mt-5 overflow-y-scroll' >

                                    {chats.map((item) => {
                                        return <div key={item.id} onClick={() => {
                                            setCurrentChat(item);
                                            setMessages(item.messages);
                                        }}>
                                            <UserChatCard key={item.id} chat={item} />
                                        </div>
                                    })}

                                </div>

                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid className='h-full' item xs={9}>
                    {currentChat ? <div>
                        <div className='flex items-center justify-between p-5 border-l'>

                            <div className='flex items-center space-x-3'>

                                <Avatar src='' />
                                <p className='font-semibold'>{user.id === currentChat.users[0].id ? currentChat.users[1].firstName + " "
                                    + currentChat.users[1].lastName : currentChat.users[0].firstName + " "
                                + currentChat.users[0].lastName}</p>

                            </div>

                            <div className='flex space-x-3'>
                                <IconButton>
                                    <AddIcCallIcon />
                                </IconButton>
                                <IconButton>
                                    <VideoCallIcon />
                                </IconButton>

                            </div>

                        </div>

                        <div ref={chatContainer} className='overflow-y-scroll h-[75vh] px-2 space-y-5 py-5'>
                            {messages.map((item) => <MessageCard item={item} />)}
                        </div>
                        <div className='sticky bottom-0 border-l'>
                            <div className='py-5 flex items-center justify-center space-x-5'>
                                <input onKeyPress={(e) => {
                                    if (e.key === "Enter" && e.target.value) {
                                        handleCreateMessage(e.target.value);
                                    }
                                }}
                                    ref={inputRef}
                                    className='bg-transparent border border-[#3b4054] 
                            rounded-full w-[90%] py-3 px-5' type='text' placeholder='Type Message...' />

                                <div>
                                    <input type='file' accept='image/*' onChange={handleSelectImage}
                                        className='hidden' id='image-input' />
                                    <label htmlFor='image-input'><AddPhotoAlternateIcon /></label>
                                </div>
                            </div>
                        </div>
                    </div> : <div className='h-full space-y-5 flex flex-col justify-center items-center'>
                        <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
                        <p className='text-xl font-semibold'>No chat selected</p>
                    </div>}
                </Grid>
            </Grid>
        </div>
    )
}

export default Message