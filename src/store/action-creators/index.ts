import * as UserActionCreators from './user'
import * as TokenActionCreators from './token'
import * as MoviesActionCreators from './movies'
import * as SavedMoviesActionCreators from './savedMovies'

export default {
  ...UserActionCreators,
  ...TokenActionCreators,
  ...MoviesActionCreators,
  ...SavedMoviesActionCreators,
}
