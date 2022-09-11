import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBCardGroup,
  MDBRow,
  MDBCol,
  MDBBtn,
} from 'mdb-react-ui-kit';
import Spinner from '../components/Spinner';
import { getTours } from '../redux/features/tourSlice';
import { excerpt } from '../utils';
import { TOUR_DEFAULT_IMAGE } from '../constants';

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { category } = useParams();

  const { totalToursData, loading } = useSelector((state) => state.tour);

  useEffect(() => {
    if (!totalToursData || totalToursData.length <= 0) dispatch(getTours({}));
  }, [totalToursData]);

  return loading ? (
    <Spinner />
  ) : (
    <div
      style={{
        margin: 'auto',
        padding: '120px',
        maxWidth: '900px',
        alignContent: 'center',
      }}
    >
      <h3 className="text-center">Category: {category}</h3>
      <hr style={{ maxWidth: '570px' }} />

      {totalToursData
        ?.filter((item) => item.category === category)
        .map((tour) => (
          <MDBCardGroup key={tour._id}>
            <MDBCard>
              <MDBRow>
                <MDBCol md="4" style={{ height: '135px' }}>
                  <MDBCardImage
                    src={tour.imageFile || TOUR_DEFAULT_IMAGE}
                    alt={tour.title}
                    fluid
                    style={{ height: '100%' }}
                  />
                </MDBCol>

                <MDBCol md="8" style={{ height: '135px' }}>
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {tour.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      {excerpt(tour.description, 40)}
                    </MDBCardText>

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
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default Category;
