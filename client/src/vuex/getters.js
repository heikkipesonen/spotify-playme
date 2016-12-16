const getters = {
  /**
   * getter
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   * @example
   * getterName (state) {
   *  return state.something
   * }
   */

  track (state) {
    return state.track
  },

  showSearch (state) {
    return state.searchOpen
  },

  searchResults (state) {
    return state.searchResults
  }
}

export default getters
