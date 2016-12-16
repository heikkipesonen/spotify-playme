const mutations = {
  /**
   * mutation
   * @param {object} state
   * @param {payload} payload
   * @example
   * setView (state, payload) {
   *  state.payload = payload
   * }
   */

  setTrack (state, track) {
    state.track = track
  },

  setPlayerState (state, playerState) {
    state.player = playerState
  },

  setSearchWindow (state, search) {
    state.searchOpen = search
  },

  setSearchResults (state, list) {
    state.searchResults = list
  }
}

export default mutations
