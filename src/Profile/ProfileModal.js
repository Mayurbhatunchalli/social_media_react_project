import { Avatar, Box, Button, Grid, IconButton, Modal, TextField } from '@mui/material'
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { updateUserProfileAction } from '../Redux/Auth/auth.action';
import Profile_Photo from './Profile_Photo.jfif'
import Post1 from './Post1.jfif'
import EditIcon from '@mui/icons-material/Edit';
import UploadToCloud from '../utils/UploadToCloud';

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

const ProfileModal = ({ user, handleClose, open }) => {

    const dispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState(user.profilePicture);

    const formik = useFormik({
        initialValues: {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
        },
        onSubmit: (values,) => {
            console.log("Update values", values);
            dispatch(updateUserProfileAction(values));
        }
    })

    const [isLoading, setIsLoading] = useState(false);

    const handleSelectImage = async (event) => {
        setIsLoading(true);
        const imageUrl = await UploadToCloud(event.target.files[0], "image");
        setSelectedImage(imageUrl);
        setIsLoading(false);
        formik.setFieldValue("profilePicture", imageUrl);

    };

    return (
        <Modal
            open={open}
            handleClose={handleClose}
            area-labelledby="modal-modal-title"
            area-describedby="modal-modaldescription"
        >

            <Box sx={style}>
                <form onSubmit={formik.handleSubmit}>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-1'>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <p>Edit Profile</p>
                        </div>
                        <Button type='submit'>Save</Button>
                    </div>


                    <div>
                        <div className='h-[15rem]'>
                            <img className='w-full h-full rounded-t-md' src={Post1} alt='' />
                        </div>
                        <Grid container className='pl-5 h-[6rem]'>
                            <Grid item>
                                <Avatar className='transform -translate-y-24'
                                    sx={{ width: "10rem", height: "10rem" }}
                                    src={selectedImage}
                                />
                            </Grid>
                            <Grid className='mt-8 px'>
                                <input type='file' accept='image/*'
                                    onChange={handleSelectImage}
                                    style={{ display: "none" }}
                                    id='image-input' />

                                <label htmlFor='image-input'>
                                    <IconButton color='primary' component="span">
                                        <EditIcon />
                                    </IconButton>
                                </label>
                            </Grid>
                        </Grid>
                    </div>

                    <div className='space-y-3'>

                        <TextField
                            fullWidth
                            id='firstName'
                            name='firstName'
                            label='First Name'
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                        />

                        <TextField
                            fullWidth
                            id='lastName'
                            name='lastName'
                            label='Last Name'
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                        />


                    </div>

                </form>

            </Box>

        </Modal>
    )
}

export default ProfileModal