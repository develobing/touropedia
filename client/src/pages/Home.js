import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBContainer, MDBCol, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { getTours } from '../redux/features/tourSlice';
import TourCard from '../components/TourCard';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();

  const { tours, currentPage, numberOfPages, loading } = useSelector(
    (state) => state.tour
  );

  useEffect(() => {
    dispatch(getTours(currentPage));
  }, [currentPage, dispatch]);

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
              No Tours Found
            </MDBTypography>
          </MDBCol>
        ) : (
          <MDBCol>
            <MDBContainer>
              <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                {tours.map((tour) => (
                  <TourCard key={tour._id} {...tour} />
                ))}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        )}
      </MDBRow>

      {tours.length > 0 && (
        <Pagination currentPage={currentPage} numberOfPages={numberOfPages} />
      )}
    </div>
  );
};

export default Home;
