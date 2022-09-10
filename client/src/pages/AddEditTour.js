import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBValidationItem,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import ChipInput from 'material-ui-chip-input';
import FileBase from 'react-file-base64';
import { toast } from 'react-toastify';
import { createTour, clearError } from '../redux/features/tourSlice';
import * as api from '../redux/api';

const initalState = {
  title: '',
  description: '',
  tags: [],
};

const AddEditTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.tour);

  const [tourData, setTourData] = useState(initalState);
  const [selectedFile, setSelectedFile] = useState(null);

  const { title, description, tags } = tourData;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError);
    }
  }, [error]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleImageChange = ({ file }) => {
    setSelectedFile(file);
  };

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.uploadImage(formData);

      const imageHost = process.env.REACT_APP_FILE_HOST || '';
      const imagePath = response.data.url;
      const imageUrl = `${imageHost}${imagePath}`;
      return imageUrl;
    } catch (error) {
      console.log('handleImageUpload() - error: ', error);
      toast.error(error);
    }
  };

  const handleAddTag = (tag) => {
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };

  const handleDeleteTag = (tagToDelete) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageFile = await handleImageUpload(selectedFile);

    if (title && description && tags) {
      dispatch(
        createTour({ data: { ...tourData, imageFile }, navigate, toast })
      );
    }
  };

  const handleClear = () => {
    setTourData(initalState);
  };

  return (
    <div
      className="container"
      style={{
        margin: 'auto',
        marginTop: '120px',
        maxWidth: '450px',
        alignContent: 'center',
      }}
    >
      <MDBCard>
        <h5>Add Tour</h5>

        <MDBCardBody>
          <MDBValidation noValidate onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-12">
              <MDBValidationItem invalid feedback="Please provide title.">
                <MDBInput
                  required
                  className="form-control"
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  value={title}
                  onChange={onInputChange}
                />
              </MDBValidationItem>
            </div>

            <div className="col-md-12">
              <MDBValidationItem invalid feedback="Please provide description.">
                <MDBInput
                  required
                  className="form-control"
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  value={description}
                  onChange={onInputChange}
                  style={{ height: '100px' }}
                />
              </MDBValidationItem>
            </div>

            <div className="col-md-12">
              <ChipInput
                fullWidth
                className="form-control"
                placeholder="Enter Tags"
                variant="outlined"
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>

            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={handleImageChange}
              />
            </div>

            <div className="col-12">
              <MDBBtn style={{ width: '100%' }}>Submit</MDBBtn>
              <MDBBtn
                style={{ width: '100%' }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;
