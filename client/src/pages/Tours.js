import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBBtn } from 'mdb-react-ui-kit';
import Spinner from '../components/Spinner';
import { loadMoreTours } from '../redux/features/tourSlice';
import TourItem from '../components/TourItem';

const Tours = () => {
  let isLoaded = false;

  const limit = 5;
  const dispatch = useDispatch();

  const { loadedTours, totalTours, loading } = useSelector(
    (state) => state.tour
  );

  const [skip, setSkip] = useState(0);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(loadMoreTours({ skip: 0, limit }));
      /* eslint-disable */
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
            <TourItem tour={tour} key={tour._id} />
          ))}
        </div>
      )}

      {totalTours <= loadedTours.length ? (
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
