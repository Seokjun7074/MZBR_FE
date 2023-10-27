import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Hashtag = () => {
  const { restaurant_id } = useParams<{ restaurant_id: string }>();

  return (
    <div>
      <p>hashtag</p>
    </div>
  );
};

export default Hashtag;
