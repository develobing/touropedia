import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBCardTitle,
  MDBListGroup,
  MDBBadge,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';

const Categories = ({ categoryCount }) => {
  return (
    <>
      <MDBCardTitle className="title text-start mt-2">Categories</MDBCardTitle>

      <MDBListGroup className="mb-3">
        {categoryCount.map((item) => (
          <Link to={`/tours/category/${item.category}`} key={item.category}>
            <MDBListGroupItem className="d-flex justify-content-between align-items-center">
              {item.category}
              <MDBBadge pill>{item.count}</MDBBadge>
            </MDBListGroupItem>
          </Link>
        ))}
      </MDBListGroup>
    </>
  );
};

export default Categories;
