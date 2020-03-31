import React, { Component } from 'react'
import Header from '../components/Header'

export default ({ component: Component, ...rest }) => {
  return (
    <div>
      <Header/>
      <Component {...rest} />
    </div>
  )
}