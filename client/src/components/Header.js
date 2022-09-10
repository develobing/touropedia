import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarItem,
  MDBNavbarLink,
} from 'mdb-react-ui-kit';
import { removeUser } from '../redux/features/authSlice';

const Header = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);

  const handleLogout = () => {
    dispatch(removeUser());
  };

  return (
    <MDBNavbar expand="lg" fixed="top" style={{ backgroundColor: '#f0e6ea' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand
          href="#"
          style={{ color: '#606080', fontWeight: '600', fontSize: '22px' }}
        >
          Touropedia
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ color: '#606080' }}
          onClick={() => setShow(!show)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={show}>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
              <h5 style={{ marginTop: '17px', marginRight: '30px' }}>
                Logged in as: {user?.result?.name}
              </h5>
            )}

            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>

            {user?.result?._id ? (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/add-tour">
                    <p className="header-text">Add Tour</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink href="/logout" onClick={handleLogout}>
                    <p className="header-text">Logout</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
