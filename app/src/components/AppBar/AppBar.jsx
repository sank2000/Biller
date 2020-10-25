import React,{useState,useContext} from 'react';
import { AppBar, Toolbar, Typography, IconButton,Menu,MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { Auth } from "../../contexts";

import axios from "axios";

export default () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const { session ,setSession } = useContext(Auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = async () => {
    try {
      const res = await axios.get('/api/auth/signout');
      setSession(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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
          <MenuItem onClick={handleClose}>{session.type}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      </Toolbar>
    </AppBar>
  </div>
}