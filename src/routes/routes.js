import React, { Component } from 'react'
import Loadable from 'react-loadable'
import DefaultLayout from '../layouts/DefaultLayout'
import SimpleLayout from '../layouts/SimpleLayout'
import HomeLayout from '../layouts/HomeLayout'

//import Home from '../views/Home'


const Home = Loadable({
  loader: () => import('../views/Home'),
  loading() {
    return <div>Loading...</div>
  },
  delay: 300,
})

export default[
  {
    layout: HomeLayout,
    component: Home,
    path: '/',
    exact: true,
  },
  {
    layout: DefaultLayout,
    component: Home,
    path: '/test'
  },
  {
    layout: SimpleLayout,
    component: Home,
    path: '/simple',
    exact: true
  }
]