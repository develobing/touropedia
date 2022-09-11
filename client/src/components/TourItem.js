import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup,
  MDBCardImage,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { deleteTour } from '../redux/features/tourSlice';
import { excerpt } from '../utils';
import { DEFAULT_IMAGE } from '../constants';

const TourItem = ({ tour }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const _userId = user?.result?._id;

  const handleDelete = (_id) => {
    if (window.confirm('Are you sure to delete this tour?')) {
      dispatch(deleteTour({ _id, toast }));
    }
  };

  return (
    <MDBCardGroup key={tour._id}>
      <MDBCard>
        <MDBRow>
          <MDBCol md="4" style={{ height: '135px' }}>
            <MDBCardImage
              src={tour.imageFile || DEFAULT_IMAGE}
              alt={tour.title}
              fluid
              style={{ height: '100%' }}
            />
          </MDBCol>

          <MDBCol md="8" style={{ height: '135px' }}>
            <MDBCardBody>
              <MDBCardTitle className="text-start">{tour.title}</MDBCardTitle>
              <MDBCardText className="text-start">
                {excerpt(tour.description, 40)}
              </MDBCardText>

              {/* Update & Delete */}
              {_userId === tour?.creator?._id && (
                <>
                  <div
                    style={{
                      marginTop: '-15px',
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

                  <div style={{ float: 'left', marginTop: '-10px' }}>
                    <MDBBtn
                      size="sm"
                      rounded
                      color="info"
                      onClick={() => navigate(`/tour/${tour._id}`)}
                    >
                      Read More
                    </MDBBtn>
                  </div>
                </>
              )}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default TourItem;
