import { createStore, action } from 'easy-peasy'

export const store = createStore({
  activeSongs: [],
  activeSong: null,
  favoriteSongs: [],
  currentUser: {firstName: "", lastName: "", id: null},
  setCurrentUser: action((state: any, payload) => {
    state.currentUser = payload
  }),
  setFavoriteSongs: action((state: any, payload) => {
    state.favoriteSongs = payload
  }),
  addToFavorites: action((state: any, payload) => {
    state.favoriteSongs.push(payload)
  }),
  removeFromFavorites: action((state: any, payload) => {
    state.favoriteSongs = state.favoriteSongs.filter(id => id !== payload)
  }),
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload
  }),
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload
  }),
})
