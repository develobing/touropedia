import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarItem,
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

  const [search, setSearch] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
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

  const handleClickBell = () => {
    setIsOpenNotification(!isOpenNotification);
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
        <Link
          to="/"
          style={{ color: '#606080', fontWeight: '600', fontSize: '22px' }}
        >
          Touropedia
        </Link>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ color: '#606080' }}
          onClick={() => setIsOpenSideMenu(!isOpenSideMenu)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={isOpenSideMenu}>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            <MDBNavbarItem>
              <Link className="nav-link" to="/">
                <p className="header-text">Home</p>
              </Link>
            </MDBNavbarItem>

            {_userId ? (
              <>
                <MDBNavbarItem>
                  <Link className="nav-link" to="/add-tour">
                    <p className="header-text">Add Tour</p>
                  </Link>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <Link className="nav-link" to="/dashboard">
                    <p className="header-text">Dashboard</p>
                  </Link>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <Link className="nav-link" to="/" onClick={handleLogout}>
                    <p className="header-text">Logout</p>
                  </Link>
                </MDBNavbarItem>
              </>
            ) : (
              <MDBNavbarItem>
                <Link className="nav-link" to="/login">
                  <p className="header-text">Login</p>
                </Link>
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
                  display: isOpenSideMenu ? 'inline-block' : 'block',
                  margin: isOpenSideMenu ? '15px 0 5px 0' : '',
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
                  display: isOpenSideMenu ? 'inline-block' : 'block',
                  margin: isOpenSideMenu ? '15px 0 5px 0' : '',
                }}
                onClick={handleClickBell}
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
              {notifications.length > 0 ? (
                <>
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
                </>
              ) : (
                <>
                  <span className="notification-content">
                    You have no notification
                  </span>

                  <div className="align-item-center">
                    <MDBBtn
                      size="sm"
                      style={{ width: '150px', backgroundColor: '#ec4a89' }}
                    >
                      Close
                    </MDBBtn>
                  </div>
                </>
              )}
            </div>
          )}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
