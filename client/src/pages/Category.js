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
import { DEFAULT_IMAGE } from '../constants';

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { category } = useParams();

  const { totalToursData, loading } = useSelector((state) => state.tour);
  const categoryTours = totalToursData?.filter(
    (item) => item.category === category
  );

  useEffect(() => {
    if (!totalToursData || totalToursData.length <= 0) dispatch(getTours({}));
  }, [totalToursData]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="tour-container" style={{ padding: '20px' }}>
      <h4 className="text-center mb-3">Category: {category}</h4>

      {categoryTours?.length === 0 ? (
        <h3 className="text-center mt-5">No tours found</h3>
      ) : (
        <div
          className="tour-container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
          }}
        >
          {categoryTours.map((tour) => (
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
      )}
    </div>
  );
};

export default Category;
