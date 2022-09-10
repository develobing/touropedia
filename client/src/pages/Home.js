import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBContainer, MDBCol, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { getTours } from '../redux/features/tourSlice';
import CardTour from './CardTour';
import Spinner from '../components/Spinner';

const Home = () => {
  const dispatch = useDispatch();

  const { tours, loading, error } = useSelector((state) => state.tour);

  useEffect(() => {
    dispatch(getTours());
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div
      style={{
        margin: 'auto',
        padding: '20px',
        maxWidth: '1000px',
        alignContent: 'center',
      }}
    >
      <MDBRow>
        {tours.length === 0 ? (
          <MDBCol>
            <MDBTypography tag="h5" variant="h5">
              No Tours Available
            </MDBTypography>
          </MDBCol>
        ) : (
          <MDBCol>
            <MDBContainer>
              <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                {tours.map((tour) => (
                  <CardTour key={tour._id} {...tour} />
                ))}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        )}
      </MDBRow>
    </div>
  );
};

export default Home;
