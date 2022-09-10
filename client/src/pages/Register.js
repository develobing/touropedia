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
import { register, clearError } from '../redux/features/authSlice';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.auth);

  const [formValue, setFormValue] = useState(initialState);
  const { firstName, lastName, email, password, confirmPassword } = formValue;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Password do not match');
    }

    if (firstName && lastName && email && password && confirmPassword) {
      dispatch(register({ data: formValue, navigate, toast }));
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
        <h5>Sign Up</h5>

        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
              <MDBValidationItem invalid feedback="Please your first name.">
                <MDBInput
                  required
                  label="First Name"
                  type="text"
                  value={firstName}
                  name="firstName"
                  onChange={onInputChange}
                />
              </MDBValidationItem>
            </div>

            <div className="col-md-6">
              <MDBValidationItem invalid feedback="Please your last name.">
                <MDBInput
                  required
                  label="Last Name"
                  type="text"
                  value={lastName}
                  name="lastName"
                  onChange={onInputChange}
                />
              </MDBValidationItem>
            </div>

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
                  onChange={onInputChange}
                />
              </MDBValidationItem>
            </div>

            <div className="col-md-12">
              <MDBValidationItem
                invalid
                feedback="Please provide your confirm password."
              >
                <MDBInput
                  required
                  label="Password Confirm"
                  type="password"
                  value={confirmPassword}
                  name="confirmPassword"
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
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>

        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
