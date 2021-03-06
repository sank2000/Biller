import React from 'react';
import FadeLoader from "react-spinners/FadeLoader";

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
      <FadeLoader
        size={150}
        color={"#21295C"}
        loading={true}
      />
    </div>
  );
}