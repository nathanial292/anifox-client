import React, { Component } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { connect } from 'react-redux'
import { fetchAnimeIfNeeded, invalidateAnime, selectAnime } from '../redux/actions'
import Title from '../components/Title'

const styles = theme => ({
  root: {
    width: "100%",
    height: "auto",
    backgroundColor: theme.palette.background[900]
  },
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
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
        {!anime.isFetching ? Object.values(anime.anime).map(value => (
          <Title
            key={value.malID}
            handleClick={this.handleAnimeClick}
            value = {value}
          />
        )): null}
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

export default withStyles(styles)(connect(mapStateToProps)(Home))
