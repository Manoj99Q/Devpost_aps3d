import React from 'react';

const Map3D = ({ center, tilt = "67.5", zoom = "15"}) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <gmp-map-3d
        center={center}
        tilt={tilt}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      ></gmp-map-3d>
    </div>
  );
};

export default Map3D;