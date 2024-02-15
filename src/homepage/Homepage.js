import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from '../components/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import MiddlePart from '../components/MiddlePart'
import Reels from '../Reels/Reels'
import CreateReels from '../Reels/CreateReels'
import Profile from '../Profile/Profile'
import HomeRight from './HomeRight'
import Message from '../Message/Message'

const Homepage = () => {

    const location = useLocation();

    return (
        <div>
            {location.pathname === "/message" ?
                <div>
                    <Routes>
                        <Route path='/message' element={<Message />} />
                    </Routes>
                </div>

                :
                <div className='px-20'>
                    <Grid container spacing={0}>
                        <Grid item xs={0} lg={3}>
                            <div className='sticky top-0'>
                                <Sidebar />
                            </div>
                        </Grid>

                        <Grid
                            lg={location.pathname === "/" ? 6 : 9}
                            item
                            className='px-5 flex justify-center'
                            xs={12}
                        >
                            <Routes>
                                <Route path='/' element={<MiddlePart />} />
                                <Route path='/reels' element={<Reels />} />
                                <Route path='/createReels' element={<CreateReels />} />
                                <Route path='/profile/:id' element={<Profile />} />
                            </Routes>
                        </Grid>

                        {location.pathname === "/" && <Grid item lg={3} className='relative'>
                            <div className='sticky top-0 w-full'>
                                <HomeRight />
                            </div>

                        </Grid>}
                    </Grid>
                </div>
            }
        </div>
    )
}

export default Homepage