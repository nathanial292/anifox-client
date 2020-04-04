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

// Episodes
const fetchEpisodes = (id) => {
  return dispatch => {
    dispatch(requestEpisodes(id))
    return foxifyjs.episode.get(id)
      .then(response => dispatch(receiveEpisodes(id, response)))
  }
}

const shouldFetchEpisodes = (state, id) => {
  const episodes = state.episodes[id]
  if (typeof episodes === 'undefined') return true
  else if (state.episodes.isFetching) return false
  else return state.episodes.didInvalidate
}

export const fetchEpisodesIfNeeded = (id) => {
  return (dispatch, getState) => {
    if (shouldFetchEpisodes(getState(), id)) {
      return dispatch(fetchEpisodes(id))
    } else {
      return Promise.resolve()
    }
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
    receivedAt: Date.now(),
    episodes: json.data,
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

/**
 * Set an anime as selected, fetch episodes
 */
export const SELECT_ANIME = 'SELECT_ANIME'
export const selectAnime = (anime) => {
  return dispatch => {
    dispatch({
      type: SELECT_ANIME,
      anime
    })
    dispatch(fetchEpisodesIfNeeded(anime))
  }
}

/**
 * Used to invalidate the home page, maybe a new anime is released and get new content
 */
export const INVALIDATE_ANIME = 'INVALIDATE_ANIME'
export const invalidateAnime = () => {
  return dispatch => {
    dispatch({
      type: INVALIDATE_ANIME
    })
    dispatch(fetchAnimeIfNeeded())
  }
}

/**
 * Used to invalidate an anime, maybe a new episode is released and get new content
 */
export const INVALIDATE_EPISODE = 'INVALIDATE_EPISODE'
export const invalidateEpisode = anime => {
  return dispatch => {
    dispatch({
      type: INVALIDATE_EPISODE,
      anime
    })
    dispatch(fetchEpisodesIfNeeded(anime))
  }
}

