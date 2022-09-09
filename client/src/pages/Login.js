import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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
import { login } from '../redux/features/authSlice';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, loading } = useSelector((state) => state.auth);

  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

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
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
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
