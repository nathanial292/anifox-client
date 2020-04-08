import React, { Component } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { fetchAnimeIfNeeded, invalidateAnime, selectAnime } from '../redux/actions'
import Title from '../components/Title'
import AnimeWrapper from '../components/AnimeWrapper'

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
    this.state = {
      index: 0,
      hasNextPage: true,
      isNextPageLoading: false,
      items: []
    }
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

  _loadNextPage = (...args) => {
    this.setState({ isNextPageLoading: true }, () => {
      this.setState(state => ({
        index: args[0]+50,
        hasNextPage: state.items.length < Object.keys(this.props.anime.anime).length,
        isNextPageLoading: false,
        items: [...state.items].concat(
          new Array(50).fill(true).map(() => (
            Object.values(this.props.anime.anime).slice(args[0], args[1]+50)
          ))
        )
      }))
      console.log(args[0], args[1])
    })
  }

  render() {
    const { anime, classes } = this.props
    return (
      <div className={`${classes.root}`}>
        {typeof anime.anime !== 'undefined' ? 
          <AnimeWrapper
            hasNextPage={this.state.hasNextPage}
            isNextPageLoading={this.state.isNextPageLoading}
            items={this.state.items}
            loadNextPage={this._loadNextPage}
            handleClick={this.handleAnimeClick}
          />
        : <span>Loading</span>}
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
