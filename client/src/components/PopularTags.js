import React from 'react';
import { NavLink } from 'react-router-dom';
import { MDBCardTitle } from 'mdb-react-ui-kit';

const PopularTags = ({ totalTags }) => {
  return (
    <>
      <MDBCardTitle className="title text-start">Popular Tags</MDBCardTitle>

      <div className="tag-label text-start">
        <ul>
          {totalTags.map((tag, index) => (
            <li className="m-1 tag" key={index}>
              <NavLink to={`/tours/tags/${tag}`} style={{ color: 'black' }}>
                {tag}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PopularTags;
