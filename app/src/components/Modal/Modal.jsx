import React,{useState} from 'react';
import {Button ,TextField} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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

const commonStyle = {
    width: "100%",
    marginBottom : "1rem"
  }

export default ({open,setOpen,setItems}) => {

  const [data, setData] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(old => {
      return {
        ...old,
        [name] : value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems((old) => [...old, {
      ...data,
      total : Number(data.price) * data.count
    }]);
    handleClose();
  }

  return <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>
           Add Item
        </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField label="Name" name="name" onChange={handleChange} variant="outlined" style={commonStyle} required />
          <TextField label="Price" name="price" onChange={handleChange} variant="outlined" style={commonStyle} required />
          <TextField label="Count" name="count" onChange={handleChange} type="number" variant="outlined" style={commonStyle} required />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
        
      </Dialog>
   </div>
}
