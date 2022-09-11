import React from 'react';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { excerpt } from '../utils';
import { DEFAULT_IMAGE } from '../constants';

const TopTour = ({ topTour }) => {
  return (
    <>
      <h4 className="text-center my-3">Top Tour</h4>

      <MDBRow className="row-cols-1 row-cols-md-3 g-4">
        {topTour.map((tour, index) => (
          <MDBCol key={index}>
            <MDBCard>
              <Link to={`/tour/${tour?._id}`}>
                <MDBCardImage
                  src={tour.imageFile || DEFAULT_IMAGE}
                  alt={tour.title}
                  position="top"
                ></MDBCardImage>
              </Link>

              <span className="text-start tag-card">
                {tour?.tags?.map((tag, index) => (
                  <Link key={index} to={`/tours/tag/${tag}`}>
                    #{tag}
                  </Link>
                ))}
              </span>

              <MDBCardBody>
                <MDBCardTitle className="text-start">{tour.title}</MDBCardTitle>
                <MDBCardText className="text-start">
                  {excerpt(tour.description)}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </>
  );
};

export default TopTour;
