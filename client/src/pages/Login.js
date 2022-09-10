import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { googleSignin, login, clearError } from '../redux/features/authSlice';
import { useGoogleLogin } from '@react-oauth/google';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.auth);

  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;

  useEffect(() => {
    if (error) {
      console.log('test');
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login({ data: formValue, navigate, toast }));
    }
  };

  const getGoogleUserInfo = (accessToken) =>
    axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
    );

  const googleSuccess = async (result) => {
    const token = result?.access_token;
    const profileResponse = await getGoogleUserInfo(token);
    const { email, name } = profileResponse.data;
    const googleId = email.substring(0, email.indexOf('@'));
    const data = { email, name, googleId };
    console.log('email, name, picture ', email, name);
    dispatch(googleSignin({ data, navigate, toast }));
  };

  const googleFailure = (error) => {
    console.log('googleFailure() - error', error);
    toast.error(error);
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: googleSuccess,
    onError: googleFailure,
  });

  return (
    <div
      style={{
        margin: 'auto',
        marginTop: '120px',
        maxWidth: '450px',
        alignContent: 'center',
      }}
    >
      <MDBCard alignment="center" style={{ padding: '20px 0 0 0' }}>
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>

        <MDBCardBody>
          <MDBValidation noValidate onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-12">
              <MDBValidationItem invalid feedback="Please provide your email.">
                <MDBInput
                  required
                  label="Email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={onInputChange}
                />
              </MDBValidationItem>
            </div>

            <div className="col-md-12">
              <MDBValidationItem
                invalid
                feedback="Please provide your password."
              >
                <MDBInput
                  required
                  label="Password"
                  type="password"
                  value={password}
                  name="password"
                  validation=""
                  onChange={onInputChange}
                />
              </MDBValidationItem>
            </div>

            <div className="col-12">
              <MDBBtn style={{ width: '100%' }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>

          <MDBBtn
            className="mt-2"
            color="danger"
            style={{ width: '100%' }}
            onClick={loginWithGoogle}
          >
            <MDBIcon fab icon="google" className="me-2" />
            Login with Google
          </MDBBtn>

          {/* <GoogleLogin
            className="mt-2"
            buttonText="Login"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
        </MDBCardBody>

        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
