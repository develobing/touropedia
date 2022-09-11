import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBTypography,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { getTours, getAllTags } from '../redux/features/tourSlice';
import TourCard from '../components/TourCard';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import PopularTags from '../components/PopularTags';
import Categories from '../components/Categories';

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    tours,
    searchQuery,
    currentPage,
    numberOfPages,
    totalTags,
    totalToursData,
    loading,
  } = useSelector((state) => state.tour);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const counts = totalToursData.reduce((prevValue, currentValue) => {
    let name = currentValue.category;
    if (!prevValue.hasOwnProperty(name)) {
      prevValue[name] = 0;
    }

    prevValue[name]++;
    delete prevValue['undefined'];
    return prevValue;
  }, {});

  const categoryCount = Object.keys(counts).map((k) => {
    return {
      category: k,
      count: counts[k],
    };
  });

  const checkScreenSize = () => {
    if (window.innerWidth < 950) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    dispatch(getTours({ page: currentPage, searchQuery }));
  }, [currentPage, searchQuery, dispatch]);

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div
      style={{
        margin: 'auto',
        padding: '20px',
        maxWidth: '1280px',
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
                  <TourCard key={tour._id} socket={socket} {...tour} />
                ))}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        )}

        {isSmallScreen ? (
          <div className="mt-4">
            <PopularTags totalTags={totalTags} />
            <Categories categoryCount={categoryCount} />
            <MDBBtn
              className="mt-3"
              style={{ width: '100%' }}
              onClick={() => navigate('/tours')}
            >
              View all Tours
            </MDBBtn>
          </div>
        ) : (
          <MDBCol size="3" className="mt-4">
            <PopularTags totalTags={totalTags} />
            <Categories categoryCount={categoryCount} />
            <MDBBtn
              className="mt-3"
              style={{ width: '100%' }}
              onClick={() => navigate('/tours')}
            >
              View all Tours
            </MDBBtn>
          </MDBCol>
        )}

        <div className="mt-3">
          {tours.length > 0 && (
            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
            />
          )}
        </div>
      </MDBRow>
    </div>
  );
};

export default Home;
