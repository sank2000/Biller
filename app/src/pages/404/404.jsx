import React from 'react';
import Typography from '@material-ui/core/Typography';

export default() => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img src="/images/404.png" style={{width : "30%"}} alt="404" ></img>
      <Typography variant="h5">OOPS !!! Page Not Found</Typography>
    </div>
  );
}