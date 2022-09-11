import React from 'react';
import TourCard from './TourCard';

const RelatedTours = ({ relatedTours }) => {
  return (
    <>
      {relatedTours?.length > 0 && (
        <div
          className="related-tours"
          style={{ padding: '20px 20px 30px 20px' }}
        >
          <h4 className="text-center">Related Tours</h4>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',

              gap: '20px',
            }}
          >
            {relatedTours.map((tour) => (
              <TourCard key={tour._id} {...tour} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedTours;
