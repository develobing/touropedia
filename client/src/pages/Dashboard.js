import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import TourItem from '../components/TourItem';
import { getToursByUser } from '../redux/features/tourSlice';

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
            <TourItem tour={tour} key={tour._id} />
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
