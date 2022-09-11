import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import TourItem from '../components/TourItem';
import { getToursByTag } from '../redux/features/tourSlice';

const TagTours = () => {
  const dispatch = useDispatch();
  const { tag } = useParams();

  const { tagTours, loading } = useSelector((state) => state.tour);

  useEffect(() => {
    if (tag) {
      dispatch(getToursByTag(tag));
    }
  }, [tag, dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <div style={{ padding: '20px' }}>
      <h3 className="text-center">Tours with tag: {tag}</h3>
      <hr />

      {tagTours.length === 0 ? (
        <h3 className="text-center mt-5">No tours found</h3>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
          }}
        >
          {tagTours.map((tour) => (
            <TourItem tour={tour} key={tour?._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TagTours;
