import React,{useState} from 'react';
import { Typography,Button } from '@material-ui/core';
import classes from "./style.module.scss";
import { AppBar } from '../../components';

export default () => {

  const [items,setItems] = useState([]);

  return <>
    <AppBar />
    <div className={classes.container}>
      <Typography variant="h5" style={{textAlign: "center"}} >
        Bill
      </Typography>
      
      <div className={classes.bill_container}>
        <div className={classes.bill_top}>
           <Typography variant="subtitle1" style={{textAlign: "right"}} >
              Date : {new Date().toLocaleDateString()}
           </Typography>
        </div>
        <div className={classes.bill_middle}>
          {
            items.length === 0 ?  <Typography variant="h6" style={{textAlign: "center",margin: "5rem 0"}} >
                    Add Items to Bill
              </Typography> : null
          }
        </div>
        <div className={classes.bill_bottom}>
          <Button variant="outlined" color="secondary">
            Add Item
          </Button>
          <Button variant="outlined" color="primary" type="submit">
            Create
          </Button>
        </div>
      </div>

    </div>
  </>;
}


