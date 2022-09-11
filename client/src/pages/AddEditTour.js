import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBTextArea,
  MDBBtn,
} from 'mdb-react-ui-kit';
import ChipInput from 'material-ui-chip-input';
import FileBase from 'react-file-base64';
import { toast } from 'react-toastify';
import {
  createTour,
  updateTour,
  clearError,
} from '../redux/features/tourSlice';
import * as api from '../redux/api';

const initalState = {
  title: '',
  description: '',
  tags: [],
};

const AddEditTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();

  const { userTours, error } = useSelector((state) => state.tour);

  const [tourData, setTourData] = useState(initalState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { title, description, tags } = tourData;

  useEffect(() => {
    if (_id) {
      const singleTour = userTours.find((tour) => tour._id === _id);
      setTourData(singleTour);
    }
  }, [_id, userTours]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError);
    }
  }, [error, dispatch]);

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
    setTagErrMsg(null);
  };

  const handleDeleteTag = (tagToDelete) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tags.length === 0) {
      setTagErrMsg('Please add at least one tag');
      return;
    }

    const imageFile = await handleImageUpload(selectedFile);

    // Create tour
    if (!_id) {
      if (title && description && tags) {
        dispatch(
          createTour({
            data: { ...tourData, imageFile },
            navigate,
            toast,
          })
        );
      }
    }

    // Update tour
    else {
      dispatch(
        updateTour({ _id, data: { ...tourData, imageFile }, toast, navigate })
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
        <h5>{_id ? 'Update Tour' : 'Add Tour'}</h5>

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
                <MDBTextArea
                  required
                  className="form-control"
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  rows={4}
                  value={description}
                  onChange={onInputChange}
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

              {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
            </div>

            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={handleImageChange}
              />
            </div>

            <div className="col-12">
              <MDBBtn style={{ width: '100%' }}>
                {_id ? 'Update' : 'Submit'}
              </MDBBtn>
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
