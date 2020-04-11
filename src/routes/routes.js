import React, { Component } from 'react'
import Loadable from 'react-loadable'
import DefaultLayout from '../layouts/DefaultLayout'
import SimpleLayout from '../layouts/SimpleLayout'
import HomeLayout from '../layouts/HomeLayout'

import { MoonLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: 'white'
`;

const Home = Loadable({
  loader: () => import('../views/Home'),
  loading() {
    return (
    <MoonLoader
      css={override}
      size={150}
      color={"#FFF"}
      loading={true}
    />)
  },
  delay: 300,
})
//import Home from '../views/Home'

export default[
  {
    layout: DefaultLayout,
    component: Home,
    path: '/',
    exact: true,
  },
  {
    layout: HomeLayout,
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