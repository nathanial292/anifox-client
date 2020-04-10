import React, { Component } from 'react'
import Header from '../components/Header'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    backgroundColor: '#212121'
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