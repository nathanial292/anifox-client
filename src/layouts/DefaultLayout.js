import React, { Component } from 'react'
import Header from '../components/Header'
import { withStyles, makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    backgroundColor: theme.palette.background[900]
  }
}))

const DefaultLayout = ({ component: Component, ...rest }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Header />
      <Component {...rest} />
    </div>
  )
}

export default DefaultLayout