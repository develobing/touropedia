import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
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
  MDBBadge,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { removeUser } from '../redux/features/authSlice';
import { setCurrentPage, setSearchQuery } from '../redux/features/tourSlice';
import { getProfile } from '../redux/features/profileSlice';
import { DEFAULT_IMAGE } from '../constants';

const Header = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { userDetail } = useSelector((state) => state.profile);

  const [notifications, setNotifications] = useState([]);
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  const token = user?.token;
  const _userId = user?.result?._id;

  useEffect(() => {
    if (_userId) dispatch(getProfile({ _id: _userId }));
  }, [_userId, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on('receiveNotification', (data) => {
        setNotifications((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  // Check if the token is expired
  if (token) {
    const decodeToken = jwtDecode(token);
    const isTokenExpired = decodeToken.exp * 1000 < new Date().getTime();

    if (isTokenExpired) {
      dispatch(removeUser());
    }
  }

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    dispatch(removeUser());
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (search) {
      dispatch(setCurrentPage(1));
      dispatch(setSearchQuery(search));
      navigate('/');
    }
  };

  const handleBell = () => {
    if (notifications.length) {
      setIsOpenNotification(!isOpenNotification);
    }
  };

  const handleRead = () => {
    setNotifications([]);
    setIsOpenNotification(false);
  };

  const displayNotification = ({ senderName }) => {
    return (
      <span className="notification-content">{senderName} liked your tour</span>
    );
  };

  return (
    <MDBNavbar expand="lg" style={{ backgroundColor: '#f0e6ea' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand
          href="/"
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
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>

            {_userId ? (
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
                  <MDBNavbarLink href="/" onClick={handleLogout}>
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

          <form className="d-flex input-group w-auto" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Tour"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div
              style={{ marginTop: '5px', marginLeft: '5px', cursor: 'pointer' }}
              onClick={handleSearch}
            >
              <MDBIcon fas icon="search" />
            </div>
          </form>

          {_userId && (
            <>
              <div
                style={{
                  display: show ? 'inline-block' : 'block',
                  margin: show ? '15px 0 5px 0' : '',
                  marginLeft: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/profile/${userDetail?._id}`)}
              >
                <img
                  src={userDetail?.imageFile || DEFAULT_IMAGE}
                  alt={userDetail?.name}
                  style={{
                    width: '30px ',
                    height: '30px',
                    borderRadius: '50%',
                  }}
                />
              </div>

              <div
                className="mx-3"
                style={{
                  display: show ? 'inline-block' : 'block',
                  margin: show ? '15px 0 5px 0' : '',
                }}
                onClick={handleBell}
              >
                <MDBIcon fas icon="bell" style={{ cursor: 'pointer' }} />
                <MDBBadge notification pill color="danger">
                  {notifications.length > 0 && (
                    <div className="counter">{notifications.length}</div>
                  )}
                </MDBBadge>
              </div>
            </>
          )}

          {isOpenNotification && (
            <div
              className="notification"
              onClick={() => setIsOpenNotification(false)}
            >
              {notifications.map((notification) =>
                displayNotification(notification)
              )}

              <div className="align-item-center">
                <MDBBtn
                  size="sm"
                  style={{ width: '150px', backgroundColor: '#ec4a89' }}
                  onClick={handleRead}
                >
                  Mark as all read
                </MDBBtn>
              </div>
            </div>
          )}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
