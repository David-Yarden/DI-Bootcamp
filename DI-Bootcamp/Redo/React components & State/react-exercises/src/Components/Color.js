import React, { useState, useEffect } from 'react';

function Color() {
  const [favoriteColor, setFavoriteColor] = useState('red');

  useEffect(() => {
    alert('useEffect reached');
  }, []);

  return (
    <div>
      <h1>My Favorite Color is <i>{favoriteColor}</i></h1>
      <button onClick={() => setFavoriteColor('blue')}>Change color</button>
    </div>
  );
}

export default Color;
