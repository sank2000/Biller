import React,{useContext} from 'react';
import { AppBar } from '../../components';
import { Typography } from '@material-ui/core';
import classes from "./Home.module.scss";
import { Auth } from "../../contexts";

function Card({ name, image, link, ...props }) {
  return (
    <a href={link} className="col-1-of-3" style={{ textDecoration: "none" }}>
      <div
        className={classes.card}
        style={{
          backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${image})`,
        }}
        {...props}
      >
        <Typography variant="h5" className={classes.text}>{name}</Typography>
      </div>
    </a>
  );
}

export default function Home() {

  const { session } = useContext(Auth);
  
  return <>
    <AppBar />
    <section className={classes.section}>
      {session.type === "customer" && <Card name="Pay Bill" image='/images/pay.jpg' link="/paybill" />}
      {session.type === "owner" && <Card name="Create Bill" image='/images/create.jpg' link="/createbill" />}
      {(session.type === "customer" || session.type === "owner") && <Card name="Bills" image='/images/history.jpg' link="#a" />}
      {session.type === "admin" && <Card name="Create Account" image='/images/create.jpg' link="/createuser" />}
    </section>
  </>;
}
