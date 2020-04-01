import foxifyjs from 'foxifyjs'

/**
 * Fetch all anime from endpoint
 */
export const REQUEST_ANIME = 'REQUEST_ANIME'
const requestAnime = () => {
  return { type: REQUEST_ANIME }
}

/**
 * On response of api, all anime
 */
export const RECEIVE_ANIME = 'RECEIVE_ANIME'
const receiveAnime = json => {
  return {
    type: RECEIVE_ANIME,
    anime: json.data,
    receivedAt: Date.now()
  }
}

// Thunk action creater for grabbing anime
export const fetchAnime = () => {
  return dispatch => {
    dispatch(requestAnime())
    return foxifyjs.anime.getAll()
      .then(json => dispatch(receiveAnime(json)))
  }
}

const shouldFetchAnime = (state) => {
  const anime = state.anime
  if (!anime.anime) return true
  else if (anime.isFetching) return false
  else return anime.didInvalidate
}

export const fetchAnimeIfNeeded = () => {
  return (dispatch, getState) => {
    if(shouldFetchAnime(getState())) {
      return dispatch(fetchAnime())
    } else {
      return Promise.resolve()
    }
  }
}

/**
 * Set an anime as selected
 */
export const SELECT_ANIME = 'SELECT_ANIME'
const selectAnime = anime => {
  return {
    type: SELECT_ANIME,
    anime
  }
}

/**
 * Used to invalidate an anime, maybe a new episode is released and refresh the page
 */
export const INVALIDATE_ANIME = 'INVALIDATE_ANIME'
const invalidateAnime = anime => {
  return {
    type: INVALIDATE_ANIME,
    anime
  }
}

/**
 * Get episodes for anime
 */
export const REQUEST_EPISODES = 'REQUEST_EPISODES'
const requestEpisodes = anime => {
  return {
    type: REQUEST_EPISODES,
    anime
  }
}

/**
 * On episodes success
 */
export const RECEIVE_EPISODES = 'RECEIVE_EPISODES'
const receiveEpisodes = (anime, json) => {
  return {
    type: RECEIVE_EPISODES,
    anime,
    episodes: json.data,
    receivedAt: Date.now()
  }
}

/**
 * On episodes fail
 */
export const FAIL_EPISODES = 'FAIL_EPISODES'
const failEpisodes = error => {
  return {
    type: FAIL_EPISODES,
    error: error.message || 'Something bad happened'
  }
}

export {
  requestAnime,
  receiveAnime,
  selectAnime,
  invalidateAnime,
  requestEpisodes,
  receiveEpisodes,
  failEpisodes
}
