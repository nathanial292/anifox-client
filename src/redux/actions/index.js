import foxifyjs from 'foxifyjs'

/**
 * Fetch all anime from endpoint
 */
export const REQUEST_ANIME = 'REQUEST_ANIME'
export const RECEIVE_ANIME = 'RECEIVE_ANIME'
export const FAIL_ANIME = 'FAIL_ANIME'
export const INVALIDATE_ANIME = 'INVALIDATE_ANIME'

/**
 * Used to invalidate the home page, maybe a new anime is released and get new content
 */
export const invalidateAnime = () => {
  return dispatch => {
    dispatch({
      type: INVALIDATE_ANIME
    })
    dispatch(fetchAnimeIfNeeded())
  }
}

// Request all the anime from anifox
const requestAnime = () => {
  return { type: REQUEST_ANIME }
}

// When the anime is received
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

// Determines if the anime should be fetched depending on already existing data
const shouldFetchAnime = (state) => {
  const anime = state.anime
  if (!anime.anime) return true
  else if (anime.isFetching) return false
  else return anime.didInvalidate
}

// Attemps to fetch anime, happens on home page load by default
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
 * Episodes
 */
export const REQUEST_EPISODES = 'REQUEST_EPISODES'
export const RECEIVE_EPISODES = 'RECEIVE_EPISODES'
export const FAIL_EPISODES = 'FAIL_EPISODES'
export const INVALIDATE_EPISODE = 'INVALIDATE_EPISODE'
export const SELECT_ANIME = 'SELECT_ANIME'


// Set an anime as selected, fetch episodes
export const selectAnime = (anime) => {
  return dispatch => {
    dispatch({
      type: SELECT_ANIME,
      anime
    })
    dispatch(fetchEpisodesIfNeeded(anime))
  }
}


// Used to invalidate an anime, maybe a new episode is released and get new content
export const invalidateEpisode = anime => {
  return dispatch => {
    dispatch({
      type: INVALIDATE_EPISODE,
      anime
    })
    dispatch(fetchEpisodesIfNeeded(anime))
  }
}

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

// Get episodes for anime
const requestEpisodes = anime => {
  return {
    type: REQUEST_EPISODES,
    anime
  }
}

// On episode receive success
const receiveEpisodes = (anime, json) => {
  return {
    type: RECEIVE_EPISODES,
    anime,
    receivedAt: Date.now(),
    episodes: json.data,
  }
}

// On episode fetch fail
const failEpisodes = error => {
  return {
    type: FAIL_EPISODES,
    error: error.message || 'Something bad happened'
  }
}

export const SET_EPISODE_INDEX = 'SET_EPISODE_INDEX'
export const setEpisodeIndex = (index) => {
  return {
    type: SET_EPISODE_INDEX,
    index
  }
}