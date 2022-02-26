export const state = () => ({
  isLoggedIn: 0,
  user: {},
})

// export const actions = {
//   counterUp({ state, commit }, payload) {
//     commit('isLoggedIn', payload)
//   },
// }

export const mutations = {
  user(state, user) {
    state.isLoggedIn = !!user
    state.user = user || {}
  },
}

// export const getters = {
//   isLoggedIn(state) {
//     return state.isLoggedIn
//   },
// }
