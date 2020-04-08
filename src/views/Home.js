import React, { Component } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { fetchAnimeIfNeeded, invalidateAnime, selectAnime } from '../redux/actions'
import Title from '../components/Title'

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: 'flex',
    'justify-content': 'flex-start',
    'flex-wrap': 'wrap',
    backgroundColor: '#212121'
  },
  anime: {
    display: 'flex',
    'flex-wrap': 'wrap',
    'flex-direction': 'column',
    'justify-content': 'flex-start',
    height: 'auto',
    width: '167px',
    margin: '0px 2px 0px 2px',
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

  handleAnimeClick(malID, e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(selectAnime(malID))
  }

  render() {
    const { anime, classes } = this.props
    return (
      <div className={`${classes.root}`}>
        {typeof anime.anime !== 'undefined' ? Object.values(anime.anime).map(value => (
          <Title
            key={value.malID}
            handleClick={this.handleAnimeClick}
            value = {value}
          />
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
