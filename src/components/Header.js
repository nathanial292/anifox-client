import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "50px"
  },
  appBar: {
    backgroundColor: theme.palette.background[900]
  }
}))

const Header = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar variant="dense">
                <Typography style={{color: 'white'}}variant="h6" edge="start" color="initial">
                    Anifox
                </Typography>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header