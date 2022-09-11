import React from 'react';
import { useDispatch } from 'react-redux';
import {
  MDBPagination,
  MDBPaginationItem,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { setCurrentPage } from '../redux/features/tourSlice';

const Pagination = ({ currentPage, numberOfPages }) => {
  const dispatch = useDispatch();

  return (
    <div className="mt-4">
      <MDBPagination center>
        <MDBPaginationItem>
          <MDBBtn
            floating
            rounded
            className="mx-2"
            disabled={currentPage <= 1}
            color="primary"
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          >
            <MDBIcon icon="chevron-left" />
          </MDBBtn>
        </MDBPaginationItem>

        <MDBPaginationItem>
          <p className="fw-bold mt-1">{currentPage}</p>
        </MDBPaginationItem>

        <MDBPaginationItem>
          <MDBBtn
            floating
            rounded
            className="mx-2"
            disabled={currentPage >= numberOfPages}
            color="primary"
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          >
            <MDBIcon icon="chevron-right" />
          </MDBBtn>
        </MDBPaginationItem>
      </MDBPagination>
    </div>
  );
};

export default Pagination;
