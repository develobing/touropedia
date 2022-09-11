import React from 'react';
import { MDBBadge } from 'mdb-react-ui-kit';

const CategoryBadge = ({ category }) => {
  const colorKey = {
    City: 'primary',
    Beach: 'info',
    Mountain: 'secondary',
    Forest: 'success',
    Historic: 'info',
  };

  return (
    <h5>
      <MDBBadge color={colorKey[category]}>{category}</MDBBadge>
    </h5>
  );
};

export default CategoryBadge;
