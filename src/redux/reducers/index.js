import {
  SELECT_ANIME,
  INVALIDATE_ANIME,
  INVALIDATE_EPISODE,
  REQUEST_EPISODES,
  RECEIVE_EPISODES,
  FAIL_EPISODES,
  REQUEST_ANIME,
  RECEIVE_ANIME,
  SET_EPISODE_INDEX
} from "../actions"

import { combineReducers } from 'redux'

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
      return {...state, isFetching: false, didInvalidate: false, lastUpdated: action.receivedAt, [action.anime]: action.episodes}
    case FAIL_EPISODES:
      return {...state, isFetching: false, error: action.error}
    default:
      return state
  }
}

const anime = (state = {
  isFetching: false,
  index: 0
}, action) => {
  switch (action.type) {
    case INVALIDATE_EPISODE:
      return {...state, didInvalidate: true}
    case REQUEST_ANIME:
      return {...state, didInvalidate: false, isFetching: true}
    case RECEIVE_ANIME:
      return {...state, didInvalidate: false, isFetching: false, anime: action.anime}
    case SET_EPISODE_INDEX:
      return {...state, index: action.index}
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