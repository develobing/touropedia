import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import TourItem from '../components/TourItem';
import { getTours } from '../redux/features/tourSlice';

const Category = () => {
  const dispatch = useDispatch();
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
            <TourItem tour={tour} key={tour?._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
