import * as UserActionCreators from './user'
import * as TokenActionCreators from './token'

export default {
  ...UserActionCreators,
  ...TokenActionCreators,
}
