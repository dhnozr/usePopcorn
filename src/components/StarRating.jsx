import React, { useState } from 'react';

function StarRating({ onRate }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = index => {
    setRating(prev => (prev === index ? 0 : index));
    onRate(prev => (prev === index ? 0 : index));
  };
  return (
    <>
      <div style={{ display: 'flex' }}>
        {Array.from({ length: 10 }, (_, index) => (
          <Star
            key={index}
            index={index}
            setRating={handleRating}
            full={(tempRating > index && tempRating) || rating > index}
            setTempRating={setTempRating}
          />
        ))}
      </div>
    </>
  );
}

function Star({ index, setRating, full, setTempRating }) {
  return (
    <>
      <span
        style={{ width: 36, height: 36, cursor: 'pointer' }}
        onMouseEnter={() => setTempRating(index + 1)}
        onMouseLeave={() => setTempRating(0)}
        onClick={() => setRating(index + 1)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill={full ? '#fcc419' : '#0b0b0b'}
          stroke={full ? '#fcc419' : '#000'}
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      </span>
    </>
  );
}

export default StarRating;
