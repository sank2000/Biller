import React,{useState,useContext} from 'react';
import { AppBar, Toolbar, Typography, IconButton,Menu,MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccessibilityIcon from '@material-ui/icons/Accessibility';

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
        <a href="/" style={{textDecoration: "none",flexGrow: 1,display: 'flex',alignItems: 'center'}}>
          <img src={"/images/bill.png"} style={{ width: "1.5rem",height: "1.5rem",marginRight: ".5rem" }} alt="logo" />
          <Typography variant="h6" style={{color: "white"}}>
            Biller
          </Typography>
        </a>
        <IconButton onClick={handleClick}>
          <AccountCircle style={{color: "white"}}/>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
        <MenuItem onClick={handleClose}><PersonIcon style={{color: "#21295C",marginRight:".5rem"}} />{session.name}</MenuItem>
        <MenuItem onClick={handleClose}><AccessibilityIcon style={{color: "#21295C",marginRight:".5rem"}} />{session.type}</MenuItem>
        <MenuItem onClick={handleLogout}><ExitToAppIcon style={{color: "#21295C",marginRight:".5rem"}} />Logout</MenuItem>
      </Menu>
      </Toolbar>
    </AppBar>
  </div>
}