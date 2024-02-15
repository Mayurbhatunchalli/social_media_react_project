import { Avatar, Card, CardHeader, IconButton } from '@mui/material'
import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';

const UserChatCard = ({ chat }) => {

    const user = useSelector(store => store.auth.user);

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <div>
            <Card
            raised={isHovered}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
                <CardHeader
                    avatar={<Avatar sx={{
                        width: '2.5rem', height: '2.5rem',
                        fontSize: '1.5rem', bgcolor: "#191c29", color: 'rgb(88,199,250'
                    }} src='' />}
                    action={
                        <IconButton>
                            <MoreHorizIcon />
                        </IconButton>
                    }
                    title={user.id === chat.users[0].id ? chat.users[1].firstName + " "
                        + chat.users[1].lastName : chat.users[0].firstName + " "
                    + chat.users[0].lastName}
                    subheader={"Hello"}>

                </CardHeader>
            </Card>
        </div>
    )
}

export default UserChatCard