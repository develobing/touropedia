import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';
import FileBase from 'react-file-base64';
import { toast } from 'react-toastify';
import { setProfile } from '../redux/features/authSlice';
import { getProfile, updateProfile } from '../redux/features/profileSlice.js';
import Spinner from '../components/Spinner.js';
import { DEFAULT_IMAGE } from '../constants.js';
import * as api from '../redux/api';
import { getToursByUser } from '../redux/features/tourSlice';
import TopTour from '../components/TopTour';

const Profile = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();

  const { userDetail, loading } = useSelector((state) => state.profile);
  const { userTours } = useSelector((state) => state.tour);
  const topTour = userTours.slice(0, 3);

  const [info, setInfo] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (_id) {
      dispatch(getProfile({ _id }));
      dispatch(getToursByUser(_id));
    }
  }, [_id, dispatch]);

  const handleSave = async () => {
    const { name, occupation, mobile, address } = info;

    if (!name || !occupation || !mobile || !address) {
      return toast.error('Please fill all the fields');
    }

    let imageFile;
    if (selectedImage) {
      const selectedFile = selectedImage.file;
      imageFile = await handleImageUpload(selectedFile);
    }

    dispatch(updateProfile({ _id, data: { ...info, imageFile } }));
    dispatch(setProfile(info));
    setIsEditMode(false);
    toast.success('Profile updated successfully');
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setInfo({});
    setSelectedImage(null);
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setInfo(userDetail);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleImageChange = (fileInfo) => {
    setSelectedImage(fileInfo);
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

      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div
      style={{
        margin: 'auto',
        padding: '20px',
        maxWidth: '1000px',
        alignContent: 'center',
      }}
    >
      <h4 className="text-center mb-3">User Profile</h4>

      <MDBRow className="row-cols-1 row-cols-md-3 g-4">
        <MDBCol>
          <MDBCard className="d-sm-flex" style={{ width: '18rem' }}>
            <MDBCardImage
              src={
                selectedImage?.base64 || userDetail?.imageFile || DEFAULT_IMAGE
              }
              alt={userDetail?.name}
              style={{
                width: '250px',
                height: '250px',
                margin: 'auto',
                borderRadius: '50%',
              }}
            />

            {isEditMode && (
              <div className="mt-3 px-3">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={handleImageChange}
                />
              </div>
            )}

            <hr />
            <h5 className="mt-2">{userDetail?.name}</h5>
            <p className="mb-1 info">{userDetail?.occupation}</p>
            <p className="info">{userDetail?.address}</p>
          </MDBCard>
        </MDBCol>

        <MDBCol>
          <MDBCard className="mb-3" style={{ width: '38rem' }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="3">
                  <h6 className="mt-1 mb-0 text-start">Full Name</h6>
                </MDBCol>

                <MDBCol sm="9">
                  {isEditMode ? (
                    <MDBInput
                      value={info?.name}
                      name="name"
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-start lead info">{userDetail?.name}</p>
                  )}
                </MDBCol>
              </MDBRow>
              <hr />

              <MDBRow>
                <MDBCol sm="3">
                  <h6 className="mt-1 mb-0 text-start">Email</h6>
                </MDBCol>

                <MDBCol sm="9">
                  <p className="text-start lead info">{userDetail?.email}</p>
                </MDBCol>
              </MDBRow>
              <hr />

              <MDBRow>
                <MDBCol sm="3">
                  <h6 className="mt-1 mb-0 text-start">Occupation</h6>
                </MDBCol>

                <MDBCol sm="9">
                  {isEditMode ? (
                    <MDBInput
                      value={info?.occupation}
                      name="occupation"
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-start lead info">
                      {userDetail?.occupation
                        ? userDetail?.occupation
                        : 'Please update occupation'}
                    </p>
                  )}
                </MDBCol>
              </MDBRow>
              <hr />

              <MDBRow>
                <MDBCol sm="3">
                  <h6 className="mt-1 mb-0 text-start">Mobile</h6>
                </MDBCol>

                <MDBCol sm="9">
                  {isEditMode ? (
                    <MDBInput
                      value={info?.mobile}
                      name="mobile"
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-start lead info">
                      {userDetail?.mobile
                        ? userDetail?.mobile
                        : 'Please update mobile'}
                    </p>
                  )}
                </MDBCol>
              </MDBRow>
              <hr />

              <MDBRow>
                <MDBCol sm="3">
                  <h6 className="mt-1 mb-0 text-start">Address</h6>
                </MDBCol>

                <MDBCol sm="9">
                  {isEditMode ? (
                    <MDBInput
                      value={info?.address}
                      name="address"
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-start lead info">
                      {userDetail?.address
                        ? userDetail?.address
                        : 'Please update address'}
                    </p>
                  )}
                </MDBCol>
              </MDBRow>
              <hr />

              {isEditMode ? (
                <>
                  <MDBBtn color="success" className="mx-2" onClick={handleSave}>
                    Save
                  </MDBBtn>
                  <MDBBtn color="light" className="mx-2" onClick={handleCancel}>
                    Cancel
                  </MDBBtn>
                </>
              ) : (
                <MDBBtn onClick={handleEdit}>Edit</MDBBtn>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      {topTour && <TopTour topTour={topTour} />}
    </div>
  );
};

export default Profile;
