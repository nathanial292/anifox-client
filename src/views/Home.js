import React, { useState, useEffect, useRef, useCallback} from 'react'
import { usePopper } from 'react-popper';
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

import { useSelector, useDispatch } from 'react-redux'
import { selectAnime } from '../redux/actions'
import Title from '../components/Title'

import { MoonLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: 'white'
`;

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

const Example = () => {
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const [arrowElement, setArrowElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  return (
    <>
      <button type="button" ref={setReferenceElement}>
        Reference element
      </button>

      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        Popper element
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </>
  );
};

const Home = () => {
  const [contentCount, setContentCount] = useState(30)
  const divElement = useRef()
  const dispatch = useDispatch()
  const anime = useSelector(state => state.anime)
  const classes = useStyles()

  const handleScroll = useCallback(() => {
    const node = divElement.current
    const bottom = node.getBoundingClientRect().bottom - window.innerHeight

    if (bottom <= 200 && bottom >= 0) {
      let newLimit = contentCount + 100
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
      }) :  
      <MoonLoader
        css={override}
        size={150}
        color={"#FFF"}
        loading={anime.isFetching}
      />}
      </Grid>
    </div>
  )
}

export default Home