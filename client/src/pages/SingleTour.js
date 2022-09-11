import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBContainer,
} from 'mdb-react-ui-kit';
import moment from 'moment';
import RelatedTours from '../components/RelatedTours';
import DisqusThread from '../components/DisqusThread';
import { getTour, getRelatedTours } from '../redux/features/tourSlice';
import { TOUR_DEFAULT_IMAGE } from '../constants';

const SingleTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();

  const { tour, relatedTours } = useSelector((state) => state.tour);
  const tags = tour?.tags;

  useEffect(() => {
    if (_id && tags) {
      dispatch(getRelatedTours({ _id, data: { tags } }));
    }
  }, [_id, tags, dispatch]);

  useEffect(() => {
    dispatch(getTour(_id));
  }, [_id, dispatch]);

  return (
    <MDBContainer style={{ position: 'relative' }}>
      <MDBBtn
        floating
        tag="a"
        color="black"
        style={{
          position: 'absolute',
          top: '10px',
          left: '30px',
          zIndex: 1,
        }}
        onClick={() => navigate('/')}
      >
        <MDBIcon
          fas
          size="lg"
          color="white"
          icon="long-arrow-alt-left"
          style={{ float: 'left' }}
        />
      </MDBBtn>

      <MDBCard className="my-3">
        <MDBCardImage
          position="top"
          src={tour?.imageFile || TOUR_DEFAULT_IMAGE}
          alt={tour?.title}
          style={{ width: '100%', maxHeight: '600px' }}
        />

        <MDBCardBody>
          <h3>{tour?.title}</h3>

          <span>
            <p className="text-start tourName">
              Created By: {tour?.creator?.name}
            </p>
          </span>

          <div style={{ float: 'left' }}>
            <span className="text-start">
              {tour?.tags?.map((tag) => `#${tag} `)}
            </span>
          </div>
          <br />

          <MDBCardText className="text-start mt-2">
            <MDBIcon
              far
              icon="calendar-alt"
              className="me-2"
              size="lg"
              style={{ float: 'left', margin: '5px' }}
            />

            <small className="text-muted">
              {moment(tour?.createdAt).fromNow()}
            </small>
          </MDBCardText>

          <MDBCardText className="text-start mb-0 lead">
            {tour?.description}
          </MDBCardText>
        </MDBCardBody>

        {/* Related Tours */}
        <RelatedTours relatedTours={relatedTours} />
      </MDBCard>

      <DisqusThread id={_id} title={tour?.title || ''} path={`/tour/${_id}`} />
    </MDBContainer>
  );
};

export default SingleTour;
