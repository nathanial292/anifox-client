import React, { Component, useState, useEffect, useRef, useCallback} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

import { useSelector, useDispatch } from 'react-redux'
import { selectAnime } from '../redux/actions'
import Title from '../components/Title'

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "auto",
    backgroundColor: theme.palette.background[900]
  },
}))

export const useWindowEvent = (callback) => {
  useEffect(() => {
    window.addEventListener('scroll', callback);
    return () => window.removeEventListener('scroll', callback);
  }, [callback]);
};

const Home = () => {
  const [contentCount, setContentCount] = useState(50)
  const divElement = useRef()
  const dispatch = useDispatch()
  const anime = useSelector(state => state.anime)
  const classes = useStyles()

  const handleScroll = useCallback(() => {
    const node = divElement.current
    const bottom = node.getBoundingClientRect().bottom - window.innerHeight

    console.log(bottom)

    if (bottom <= 200 && bottom >= 0) {
      let newLimit = contentCount + 50
      setContentCount(newLimit)
    }  
  }, [divElement, window.innerHeight, contentCount])

  useWindowEvent(handleScroll)

  const handleAnimeClick = (malID, e) => {
    e.preventDefault()
    dispatch(selectAnime(malID))
  }

  return (
    <div className={classes.root} ref={divElement}>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
      {!anime.isFetching ? Object.values(anime.anime).map((value, index) => {
        {return index <= contentCount ? 
        <Title
          key={value.malID}
          handleClick={handleAnimeClick}
          value = {value}
        /> : null}
      }) : null}
      </Grid>
    </div>
  )
}

export default Home