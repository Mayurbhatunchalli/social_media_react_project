import { Avatar, Button, Card, CardHeader } from '@mui/material'
import { red } from '@mui/material/colors';
import React, { useState } from 'react'
import UserProfile from '../Profile/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { followUserAction } from '../Redux/Auth/auth.action';
import { isFollowedByReqUser } from '../utils/isLikedByReqUser';

const PopularUserCard = ({ item }) => {

    const dispatch = useDispatch();

    const user = useSelector(store => store.auth.user);

    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const handleOpenProfileModel = () => {
        setOpen(true);
    }

    const handleFollow = () => {
        dispatch(followUserAction(item.id));
    }

    return (
        <div>
            <Card className='mt-1' >
                <div className='flex items-center justify-between'>
                    <div>
                        <CardHeader onClick={handleOpenProfileModel}
                            avatar={ item.profilePicture !== null ? <div>
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={item.profilePicture} />
                            </div> : <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {item.firstName.substring(0, 1)}
                                </Avatar>
                                
                            }

                            title={item.firstName + " " + item.lastName}
                            subheader={"@" + item.firstName.toLowerCase() + "_" + item.lastName.toLowerCase()}>
                        </CardHeader>
                    </div>

                    <div>
                        <Button size='small' onClick={handleFollow}>
                            {isFollowedByReqUser(user, item) ? 'Following' : 'Follow'}
                        </Button>
                    </div>
                </div>
            </Card>

            <div>
                <UserProfile item={item} handleClose={handleClose} open={open} />
            </div>

        </div>
    )
}

export default PopularUserCard