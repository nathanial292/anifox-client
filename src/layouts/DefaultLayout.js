import React, { Component } from 'react'
import Header from '../components/Header'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: "200vh",
    backgroundColor: '#212121'
  }
}))

export default ({ component: Component, ...rest }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Header />
      <Component {...rest} />
    </div>
  )
}