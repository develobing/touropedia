import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
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
import { getToursByTag } from '../redux/features/tourSlice';
import { excerpt } from '../utils';
import { DEFAULT_IMAGE } from '../constants';

const TagTours = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

export default TagTours;
