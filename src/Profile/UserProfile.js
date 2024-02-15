import { Avatar, Box, IconButton, Modal } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    outline: "none",
    overFlow: "scroll-y",
    borderRadius: 3,
};

const UserProfile = ({ item, handleClose, open }) => {

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-1'>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <p>Close</p>
                        </div>
                    </div>
                    <div>
                        <div className='h-[15rem]'>
                            <img />
                        </div>
                        <div className='pl-5'>
                            <Avatar className='transform -translate-y-24'
                                sx={{ width: "5rem", height: "5rem" }}
                                src=''
                            />

                        </div>
                        <div>
                            <p className='font-bold'>{item.firstName + " " + item.lastName}</p>
                        </div>

                    </div>

                </Box>

            </Modal>
        </div>
    )
}

export default UserProfile