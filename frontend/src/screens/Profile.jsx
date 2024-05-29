import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";


const Profile = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector(state => state.auth);

    const [updateUser, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setUsername(userInfo.username);
        setEmail(userInfo.email);
    }, [userInfo.setUsername, userInfo.setEmail]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateUser({ _id: userInfo._id, username, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('Profile Updated Successfully');
                navigate('/profile');
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    };

    return (
        <FormContainer>
            <h1>Update Profile</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                <Button type="submit" variant="primary" className="mt-3">
                    Update
                </Button>
            </Form>
        </FormContainer>
    )
}

export default Profile;
