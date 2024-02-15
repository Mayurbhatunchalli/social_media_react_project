import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { registerUserAction } from '../../Redux/Auth/auth.action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialValues = { firstName: "", lastName: "", email: "", password: "", gender: "" };
const validationSchema = {
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().min(6, "Password must be atleast 6 characters").required("Password is required")
};

const Register = () => {

    const [formValue, setFormValue] = useState();
    const [gender, setGender] = useState("");

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSubmit = (values) => {
        values.gender = gender;
        console.log("Handle Submit", values);
        dispatch(registerUserAction({data:values}))
        navigate("/");
    }

    const handleChange = (event) => {
        setGender(event.target.value);
    }

    return (
        <div>

            <Formik onSubmit={handleSubmit}
                //validationSchema={validationSchema} 
                initialValues={initialValues}>

                <Form className='space-y-5'>

                    <div className='space-y-5'>

                        <div>
                            <Field
                                as={TextField}
                                name='firstName'
                                placeholder='First Name'
                                type='text'
                                varient='outlined'
                                fullWidth
                            />
                            <ErrorMessage
                                name='firstName'
                                component={"div"}
                                className='text-red-500'
                            />
                        </div>

                        <div>
                            <Field
                                as={TextField}
                                name='lastName'
                                placeholder='Last Name'
                                type='text'
                                varient='outlined'
                                fullWidth
                            />
                            <ErrorMessage
                                name='lastName'
                                component={"div"}
                                className='text-red-500'
                            />
                        </div>

                        <div>
                            <Field
                                as={TextField}
                                name='email'
                                placeholder='Email'
                                type='email'
                                variant='outlined'
                                fullWidth
                            />
                            <ErrorMessage
                                name='email'
                                component={"div"}
                                className='text-red-500'
                            />
                        </div>

                        <div>
                            <Field
                                as={TextField}
                                name="password"
                                placeholder="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                            />
                            <ErrorMessage
                                name="password"
                                component={"div"}
                                className="text-red-500"
                            />
                        </div>

                        <div>
                            <RadioGroup
                                onChange={handleChange}
                                row
                                aria-label="gender"
                                name="gender"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>

                            <ErrorMessage
                                name='gender'
                                component={"div"}
                                className='text-red-500'
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            sx={{ padding: ".8rem 0rem" }}
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary">
                            Register
                        </Button>
                    </div>
                </Form>

            </Formik>

            <div className='flex gap-2 items-center justify-center pt-5'>
                <p>If you have already account ?</p>
                <Button onClick={()=> navigate('/login')}>Login</Button>
            </div>
        </div>
    )
}

export default Register