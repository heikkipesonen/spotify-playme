const actions = {
  /**
   * [actionName description]
   * @param  {[type]} {commit} [description]
   * @param  {[type]} payload  [description]
   * @return {[type]}          [description]
   *
   * actionName ({commit}, payload) {
   *    commit('mutationName', payload)
   * }
   */

  setTrack ({commit}, track) {
    commit('setTrack', track)
  },

  setSearchWindow ({commit}, open) {
    commit('setSearchWindow', open)
  },

  setSearchResults ({commit}, results) {
    commit('setSearchResults', results)
  }
}

export default actions
