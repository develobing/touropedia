import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBCardGroup,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit';
import Spinner from '../components/Spinner';
import { getToursByUser } from '../redux/features/tourSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { userTours, loading } = useSelector((state) => state.tour);
  const _userId = user?.result?._id;

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + '...';
    }
    return str;
  };

  useEffect(() => {
    if (_userId) {
      console.log('_userId', _userId);
      dispatch(getToursByUser(_userId));
    }
  }, [_userId]);

  return loading ? (
    <Spinner />
  ) : (
    <div
      style={{
        margin: 'auth',
        padding: '20px',
        maxWidth: '900px',
        alignContent: 'center',
      }}
    >
      <h4 className="text-center">Dashboard: {user?.result?.name}</h4>
      <hr style={{ maxWidth: '570px' }} />

      {userTours?.map((tour) => (
        <MDBCardGroup className="my-3" key={tour._id}>
          <MDBCard style={{ maxWidth: '600px' }}>
            <MDBRow className="g-0">
              <MDBCol md="4">
                <MDBCardImage
                  fluid
                  position="top"
                  src={tour?.imageFile}
                  alt={tour?.title}
                />
              </MDBCol>

              <MDBCol md="8">
                <MDBCardBody>
                  <MDBCardTitle className="text-start">
                    {tour?.title}
                  </MDBCardTitle>

                  <MDBCardText className="text-start">
                    <small className="text-muted">
                      {excerpt(tour?.description)}
                    </small>
                  </MDBCardText>

                  <div
                    style={{
                      marginTop: '-60px',
                      marginLeft: '5px',
                      float: 'right',
                    }}
                  >
                    <Link to={`/edit-tour/${tour?._id}`}>
                      {' '}
                      <MDBIcon
                        fas
                        icon="edit"
                        size="lg"
                        style={{ color: '#55acee' }}
                      />
                    </Link>

                    <MDBBtn className="mt-1" tag="a" color="none">
                      <MDBIcon
                        fas
                        icon="trash"
                        size="lg"
                        style={{ marginLeft: '10px', color: '#dd4b39' }}
                      />
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCardGroup>
      ))}
    </div>
  );
};

export default Dashboard;
