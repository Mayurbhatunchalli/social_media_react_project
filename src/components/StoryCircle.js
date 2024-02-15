import { Avatar } from '@mui/material'
import React from 'react'
import logo from './Photo.jfif'


const StoryCircle = () => {
    return (
        <div>
            <div className='flex flex-col items-center mr-4 cursor-pointer'>
                <Avatar sx={{ width: "3rem", height: "3rem" }}
                    src={logo}>
                </Avatar>
                <p>Mayur</p>
            </div>
        </div>
    )
}

export default StoryCircle