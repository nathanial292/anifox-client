import {
  SELECT_ANIME,
  INVALIDATE_ANIME,
  REQUEST_EPISODES,
  RECEIVE_EPISODES,
  FAIL_EPISODES,
  REQUEST_ANIME,
  RECEIVE_ANIME
} from "../actions"

import { combineReducers } from 'redux'

/*
const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { item: action.item, completed: false }]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return {...todo, completed: !todo.completed}
        }
        return todo
      })
    default:
      return state
  }
}*/

const selectedAnime = (state=null, action) => {
  switch (action.type) {
    case SELECT_ANIME:
      return action.anime
    default:
      return state
  }
}

const episodes = (state = {
  isFetching: false,
  didInvalidate: false,
  }, action) => {
  switch (action.type) {
    case INVALIDATE_ANIME:
      return {...state, didInvalidate: true }
    case REQUEST_EPISODES:
      return {...state, isFetching: true, didInvalidate: false}
    case RECEIVE_EPISODES:
      return {...state, isFetching: false, didInvalidate: false, episodes: action.episodes}
    default:
      return state
  }
}

const anime = (state = {
  isFetching: false,
}, action) => {
  switch (action.type) {
    case REQUEST_ANIME:
      return {...state, isFetching: true}
    case RECEIVE_ANIME:
      return {...state, isFetching: false, anime: action.anime}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedAnime,
  anime,
  episodes
})

export default rootReducer