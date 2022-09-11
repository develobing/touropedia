import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from 'mdb-react-ui-kit';
import { likeTour } from '../redux/features/tourSlice';
import { TOUR_DEFAULT_IMAGE } from '../constants';
import { excerpt } from '../utils';

const TourCard = ({
  _id,
  title,
  description,
  tags,
  imageFile,
  likes,
  likeCount,
  creator,
  socket,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { _id: userId, name: userName } = user?.result;

  const Likes = () => {
    const isAlreadyLiked = likes.some((likeUserId) => likeUserId === userId);

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {isAlreadyLiked ? (
          <>
            <MDBIcon fas icon="thumbs-up" />
            &nbsp;
            <MDBTooltip
              tag="span"
              title={
                likes.length > 1
                  ? `You and ${likeCount - 1} others like this tour`
                  : `You already like this tour`
              }
            >
              {likeCount} Like{likeCount > 1 && 's'}
            </MDBTooltip>
          </>
        ) : (
          <>
            <MDBIcon far icon="thumbs-up" />
            &nbsp; {likeCount} Like{likeCount > 1 && 's'}
          </>
        )}
      </div>
    );
  };

  const handleLikes = () => {
    if (userId) {
      dispatch(likeTour({ _id }));

      // Send notification to the creator
      const isAlreadyLiked = likes.find((like) => like === userId);
      const isCreatedByUser = creator?._id === userId;
      if (!isCreatedByUser && !isAlreadyLiked) {
        socket.emit('sendNotification', {
          senderName: userName,
          receiverId: creator?._id,
        });
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex">
        <MDBCardImage
          src={imageFile || TOUR_DEFAULT_IMAGE}
          alt={title}
          position="top"
          style={{ maxWidth: '100%', height: '180px' }}
        />

        <div className="top-left">{creator?.name}</div>

        <div
          className="text-start tag-card"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {tags.map((tag, index) => (
              <Link to={`/tours/tags/${tag}`} key={index}>
                #{tag}
              </Link>
            ))}
          </div>

          <MDBBtn
            tag="a"
            color="none"
            style={{ minWidth: 'fit-content' }}
            onClick={handleLikes}
          >
            {userId ? (
              <Likes />
            ) : (
              <MDBTooltip tag="span" title="Please login to like tour">
                <Likes />
              </MDBTooltip>
            )}
          </MDBBtn>
        </div>

        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(description, 45)}

            <Link to={`/tour/${_id}`} style={{ float: 'right' }}>
              Read More
            </Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default TourCard;
