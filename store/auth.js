export const state = () => ({
  isLoggedIn: 0,
  user: {},
})

export const mutations = {
  user(state, user) {
    state.isLoggedIn = !!user
    state.user = user || {}
  },
}
