import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
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
    const bottom = node.getBoundingClientRect().bottom - window.innerHeight <= 100
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

export default withStyles(styles)(connect(mapStateToProps)(Home))
