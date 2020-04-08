import React from 'react'
import {Transition} from 'react-transition-group'
import {LazyLoad} from 'react-lazyload'

export default class FadeIn extends React.Component {
  constructor(props) {
    super(props)
    state = {
      loaded: false,
    }
  }

  onLoad() {
    this.setState({ loaded: true })
  }

  render() {
    const { height, children } = this.props,
      { loaded } = this.state

    return (
      <LazyLoad height={height} offset={150}>
        <Transition in={loaded} timeout={300}>
          {state =>
            <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
              {children(this.onLoad)}
            </div>}
        </Transition>
      </LazyLoad>
    )
  }
}
FadeIn.propTypes = {
  height: PropTypes.number,
  children: PropTypes.func,
}