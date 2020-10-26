import React,{useState,useEffect,useContext} from 'react';
import {Button ,Typography} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';


import { Auth } from "../../contexts";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function Row(val,ind) {
  return <TableRow key={ind}>
    <TableCell component="th" scope="row">
      {ind+1}
    </TableCell>
    <TableCell>{val.name}</TableCell>
    <TableCell>{val.count}</TableCell>
    <TableCell>{val.price}</TableCell>
    <TableCell>{val.total}</TableCell>
  </TableRow>
}

function Total({data}) {
  return <>
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell >Subtotal</TableCell>
      <TableCell >{data.subTotal}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell >Tax</TableCell>
      <TableCell >{data.tax}%</TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell >Total</TableCell>
      <TableCell >{data.total}</TableCell>
    </TableRow>
  </>
}

function Bill({data,totals}) {
  return <>
    <TableContainer component={Paper} style={{margin :"2rem 0"}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {data.map(Row)}
          </>
          <Total data={totals}/>
        </TableBody>
      </Table>
    </TableContainer>
  </>
}

export default ({ open, setOpen, data }) => {
  console.log(data)
  const { items,paid,_id,customerId, ...totals } = data;

  const [user, setUser] = useState(null);
  const { session } = useContext(Auth);

  const handleClose = () => {
    setOpen(false);
  };

  const getUser = async() => {
    try {
      const res = await axios.post("/api/user/id", { id: customerId });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (session.type === "owner") {
      getUser();
    }
    // eslint-disable-next-line 
  },[customerId])


  return <div>
      <Dialog onClose={handleClose} open={open} fullWidth>
        <DialogTitle onClose={handleClose}>
           Details
        </DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1">Bill .no     : {_id}</Typography>
        <Typography variant="subtitle1">Status : {paid ? "Paid" : "Not Paid"}</Typography>
        <Bill data={items} totals={totals} />
        {user !== null && <div>
          <Typography variant="h6">Customer Detail :</Typography>
          <Typography variant="subtitle1" style={{ display: "flex", alignItems: "center" }}>
            <PersonIcon style={{color: "#21295C",marginRight:".5rem"}} />{user.name}
          </Typography>
          <Typography variant="subtitle1" style={{ display: "flex", alignItems: "center" }}>
            <MailIcon style={{color: "#21295C",marginRight:".5rem"}} />{user.email}
          </Typography>
          <Typography variant="subtitle1" style={{ display: "flex", alignItems: "center" }}>
            <PhoneAndroidIcon style={{color: "#21295C",marginRight:".5rem"}} />{user.phone}
          </Typography>
        </div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ok
          </Button>
        </DialogActions>
        
      </Dialog>
   </div>
}
