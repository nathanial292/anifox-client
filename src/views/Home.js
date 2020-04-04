import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { fetchAnimeIfNeeded, invalidateAnime, selectAnime } from '../redux/actions'

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: 'flex',
    'justify-content': 'flex-start',
    'flex-wrap': 'wrap'
  },
  h1: {
    margin: 0
  },
  anime: {
    display: 'flex',
    'flex-wrap': 'wrap',
    'flex-direction': 'column',
    'justify-content': 'flex-start',
    height: 'auto',
    width: '167px',
    margin: '0px 2px 0px 2px'
  },
  image: {
    height: '242px',
    width: '167px'
  }
})

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleAnimeClick = this.handleAnimeClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchAnimeIfNeeded())
  }

  handleAnimeClick(anime, e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(selectAnime(anime.malID))
  }

  render() {
    const { anime, classes } = this.props
    return (
      <div className={`${classes.root}`}>
        {typeof anime.anime !== 'undefined' ? Object.values(anime.anime).map(value => (
          <div
            className={`${classes.anime}`}
            key={value.malID}
            onClick={(e) => this.handleAnimeClick(value, e)}>
            <img src={value.picture} className={`${classes.image}`}/> 
            <span>{value.title}</span>
          </div>
        )): <span>Loading</span>}
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

export default withStyles(styles)(connect(mapStateToProps)(Home))
