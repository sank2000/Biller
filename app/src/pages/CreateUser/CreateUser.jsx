import React from 'react';
import { Typography,TextField,MenuItem,Button } from '@material-ui/core';
import classes from "./style.module.scss";
import { AppBar } from '../../components';

export default () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted")
  }

  const commonStyle = {
    width: "100%",
    marginBottom : "1rem"
  }

  const type = [
    {
      value: "admin",
      label: "Admin"
    },
    {
      value: "owner",
      label: "Owner"
    },
    {
      value: "customer",
      label: "Customer"
    }
  ]

  return <>
    <AppBar />
    <div className={classes.container}>
      <Typography variant="h5" style={commonStyle} >
          Create User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" variant="outlined" style={commonStyle} required />
        <TextField label="Password" type="password" variant="outlined" style={commonStyle} required />
        <TextField label="Email" variant="outlined" style={commonStyle} required />
        <TextField label="Phone" variant="outlined" style={commonStyle} required />
        <TextField label="Type" variant="outlined" select style={commonStyle} required >
          {
            type.map((option) => {
             return <MenuItem key={option.value} value={option.value}>
              {option.label}
             </MenuItem>
            })
          }
        </TextField>
        <TextField label="Company Name" variant="outlined" style={commonStyle} />
        <TextField label="Address" multiline rows={4} variant="outlined" style={commonStyle} />
        <Button variant="outlined" color="primary" type="submit">
            Create
        </Button>
      </form>
    </div>
  </>;
}


