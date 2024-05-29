import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Hero = () => {

    const { userInfo } = useSelector(state => state.auth);

    const [logoutApiCall] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className=' py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                    <h1 className='text-center mb-4'>MERN Authentication</h1>
                    <p className='text-center mb-4'>
                        This is a boilerplate for MERN authentication that stores a JWT in
                        an HTTP-Only cookie. It also uses Redux Toolkit and the React
                        Bootstrap library
                    </p>
                    {
                        userInfo ? (
                            <>
                                <div>
                                    <LinkContainer to="/profile">
                                        <button className='profileBtn'>
                                            Profile
                                        </button>
                                    </LinkContainer>
                                    <LinkContainer onClick={logoutHandler}>
                                        <button className='logoutBtn'>
                                            Log Out
                                        </button>
                                    </LinkContainer>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='d-flex'>
                                    <LinkContainer to="/login">
                                        <Button variant='primary' className='me-3'>
                                            Sign In
                                        </Button>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Button variant='secondary'>
                                            Sign Up
                                        </Button>
                                    </LinkContainer>
                                </div>
                            </>
                        )
                    }
                </Card>
            </Container>
        </div>
    );
};

export default Hero;