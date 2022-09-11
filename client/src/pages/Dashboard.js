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
import { getToursByUser, deleteTour } from '../redux/features/tourSlice';
import { toast } from 'react-toastify';
import { DEFAULT_IMAGE } from '../constants';
import { excerpt } from '../utils';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { userTours, loading } = useSelector((state) => state.tour);
  const _userId = user?.result?._id;

  useEffect(() => {
    if (_userId) {
      dispatch(getToursByUser(_userId));
    }
  }, [_userId, dispatch]);

  const handleDelete = (_id) => {
    if (window.confirm('Are you sure to delete this tour?')) {
      dispatch(deleteTour({ _id, toast }));
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div style={{ padding: '20px' }}>
      <h4 className="text-center mb-3">Dashboard: {user?.result?.name}</h4>

      {userTours?.length > 0 ? (
        <div
          className="tour-container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
          }}
        >
          {userTours?.map((tour) => (
            <MDBCardGroup key={tour._id}>
              <MDBCard>
                <MDBRow>
                  <MDBCol md="4" style={{ height: '135px' }}>
                    <MDBCardImage
                      fluid
                      position="top"
                      src={tour?.imageFile || DEFAULT_IMAGE}
                      alt={tour?.title}
                      style={{ height: '100%' }}
                    />
                  </MDBCol>

                  <MDBCol md="8" style={{ height: '135px' }}>
                    <MDBCardBody>
                      <MDBCardTitle className="text-start">
                        {tour?.title}
                      </MDBCardTitle>

                      <MDBCardText className="text-start">
                        <small className="text-muted">
                          {excerpt(tour?.description, 40)}
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
                            onClick={() => handleDelete(tour?._id)}
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
      ) : (
        <>
          <h3 className="text-center">
            No tour registered with the user: {user?.result?.name}
          </h3>
        </>
      )}
    </div>
  );
};

export default Dashboard;
