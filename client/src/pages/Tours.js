import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
} from 'mdb-react-ui-kit';
import Spinner from '../components/Spinner';
import { excerpt } from '../utils';
import { DEFAULT_IMAGE } from '../constants';
import { loadMoreTours } from '../redux/features/tourSlice';

const Tours = () => {
  let isLoaded = false;

  const limit = 5;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loadedTours, totalTours, loading } = useSelector(
    (state) => state.tour
  );

  const [skip, setSkip] = useState(0);

  useEffect(() => {
    if (!isLoaded) {
      handleLoadMore();
      isLoaded = true;
    }
  }, []);

  const handleLoadMore = () => {
    const skipTo = skip + limit;
    dispatch(loadMoreTours({ skip: skipTo, limit }));
    setSkip(skipTo);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div style={{ padding: '20px' }}>
      <h3 className="text-center">All Tours</h3>
      <hr />

      {loadedTours.length === 0 ? (
        <h3 className="text-center mt-5">No tours found</h3>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
          }}
        >
          {loadedTours.map((tour) => (
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

      {totalTours >= loadedTours.length ? (
        <h3 className="text-center mt-5">No more tours</h3>
      ) : (
        <MDBBtn className="mt-3" onClick={handleLoadMore}>
          Load More
        </MDBBtn>
      )}
    </div>
  );
};

export default Tours;
