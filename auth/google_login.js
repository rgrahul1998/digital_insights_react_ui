import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLogIn = ({ googleLoginHandler }) => {
  const responseMessage = async (response) => {
    await googleLoginHandler(response.credential);
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div className={`d-flex justify-content-center text-center p-0`}>
      <GoogleLogin
        onSuccess={responseMessage}
        // @ts-ignore
        onError={errorMessage}
      // ux_mode="redirect"
      />
    </div>
  );
};

export default GoogleLogIn;
