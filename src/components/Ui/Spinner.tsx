
import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

const Spinner = () => {
    return (
      <BallTriangle
        height={30}
        width={30}
        radius={5}
        color="#ffffff"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );
};

export default Spinner;