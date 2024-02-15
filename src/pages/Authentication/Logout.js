import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className='flex gap-2 items-center justify-center pt-5'>
                <p>If you want to login again ?</p>
                <Button onClick={() => navigate('/login')}>Login</Button>
            </div>
        </div>
    )
}

export default Logout