import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
  MDBContainer,
  MDBCardGroup,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getTour } from '../redux/features/tourSlice';

const SingleTour = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();

  const { tour } = useSelector((state) => state.tour);

  useEffect(() => {
    dispatch(getTour(_id));
  }, [_id]);

  return (
    <MDBContainer>
      <MDBCard className="my-3">
        <MDBCardImage
          position="top"
          src={tour?.imageFile}
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
      </MDBCard>
    </MDBContainer>
  );
};

export default SingleTour;
