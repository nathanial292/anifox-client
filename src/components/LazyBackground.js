import React, { useState, useEffect } from 'react'
import { Animate } from 'react-animate-mount'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  image: {
    height: '242px',
    width: '167px',
    borderRadius: '6px',
    transition: 'opacity 1s ease 0s, filter 0.2s ease 0s',
    '&:hover': {
      'filter': 'blur(4px)',
       opacity: '0.5!important'
    },
  },
  container: {
    backgroundColor: 'rgba(0,0,0,1)',
    borderRadius: '6px',
    position: 'relative'
  }
}))

const LazyBackground = (props) => {
  const [stateSrc, setStateSrc] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [backgroundStyle, setBackgroundStyle] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    const {src} = props

    const imageLoader = new Image()
    imageLoader.src = src

    imageLoader.onload = () => {
      setStateSrc(src)
      setLoaded(true)

      props.handleload()
    }

    setBackgroundStyle(setStyles())

    return () => imageLoader.onload = null
  }, [stateSrc, loaded, props.getvisability(), props.src])

  const setStyles = () => {
    let style = {
      background: `url(${stateSrc})`,
    }
    if (!loaded) {
      style = { ...style, opacity: 0 }
    } else {
      style = {...style, opacity: 1 }
    }
    if (props.getvisability() && loaded) {
      style = {...style, opacity: 1 }
    } else {
      style = {...style, opacity: 0 }
    }
    return style
  }
  
  return (
    <Animate type="fade" show={props.getvisability() || loaded} appear>
      <div className={classes.container}>
        {props.children}
        <div className={classes.image} style={backgroundStyle}></div>
      </div>
    </Animate>
  )

}

export default LazyBackground