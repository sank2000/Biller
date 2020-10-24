import React,{useState} from 'react';
import { AppBar, Toolbar, Typography, IconButton,Menu,MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  return <div>
    <AppBar position="static">
      <Toolbar>
        <img src={"/images/bill.png"} style={{ width: "1.5rem",height: "1.5rem",marginRight: ".5rem" }} alt="logo" />
        <Typography variant="h6" style={{flexGrow: 1}}>
          Biller
        </Typography>
        <IconButton onClick={handleClick}>
          <AccountCircle />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      </Toolbar>
    </AppBar>
  </div>
}