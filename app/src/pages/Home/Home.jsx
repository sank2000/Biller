import React from 'react';
import { AppBar } from '../../components';
import { Typography } from '@material-ui/core';
import classes from "./Home.module.scss";

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
  return <>
    <AppBar />
    <section className={classes.section}>
      <Card name="Pay Bill" image='/images/pay.jpg' link="#a" />
      <Card name="Create Bill" image='/images/create.jpg' link="#a" />
      <Card name="Transaction History" image='/images/history.jpg' link="#a" />
      <Card name="Create Account" image='/images/create.jpg' link="#a" />
    </section>
  </>;
}
