import { Card, Grid } from '@mui/material';
import React from 'react'
import Login from './Login';
import Register from './Register';
import { Route, Routes } from 'react-router-dom';
import Logout from './Logout';

const Authentication = () => {
    return (
        <div>
            <Grid container>
                <Grid item xs={7}>

                </Grid>

                <Grid item xs={5}>
                    <div className='px-20 flex flex-col justify-center h-full'>
                        <Card className='card p-8'>
                            <div className='flex flex-col items-center mb-5 space-y-1'>
                                <h1 className='logo text-center'>Social Media</h1>
                                <p className='text-center text-sm w-[70&]'>Connecting Lives, Sharing Stories</p>
                            </div>

                            <Routes>
                                <Route path='/' element={<Login />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/register' element={<Register />} />
                                <Route path='/logout' exact element={<Logout />} />
                            </Routes>


                        </Card>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Authentication;