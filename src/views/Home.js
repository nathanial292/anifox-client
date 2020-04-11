import React, { Component, useState, useEffect, useRef, useCallback} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

import { connect, useSelector, useDispatch } from 'react-redux'
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
  const [contentCount, setContentCount] = useState(100)
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
      }) : null}
      </Grid>
    </div>
  )
}

/*
class Home extends Component {
  constructor(props) {
    super(props)
    this.handleAnimeClick = this.handleAnimeClick.bind(this)
    this.state = {
      contentCount: 100
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchAnimeIfNeeded())

    window.addEventListener('scroll', this.handleScroll)
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    var node = this.divElement
    //console.log(window.scrollY, window.pageYOffset, node.clientHeight, node.scrollTop, node.offsetHeight, window.innerHeight)
    //console.log(node.getBoundingClientRect().bottom - window.innerHeight)
    const bottom = node.getBoundingClientRect().bottom - window.innerHeight <= 200
    if (bottom) {      
      if (bottom) this.setState({ contentCount: this.state.contentCount+=100 })
    }    
  }

  handleAnimeClick(malID, e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(selectAnime(malID))
  }

  render() {
    const { anime, classes } = this.props
    return (
      <div className={`${classes.root}`} ref={(divElement) => { this.divElement = divElement }}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
        {!anime.isFetching ? Object.values(anime.anime).map((value, index) => {
          {return index <= this.state.contentCount ? 
          <Title
            key={value.malID}
            handleClick={this.handleAnimeClick}
            value = {value}
          /> : null}
        }) : null}
        </Grid>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { anime } = state
  return {
    anime
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Home))*/
export default Home