import { CardsTotalcCountState, CardsTotalcCountActionType, CardsTotalcCountAction } from '../../types/cardsTotalCount'

const initialState: CardsTotalcCountState = {
  count: 0
}

export const cardsTotalCountReducer = (state: CardsTotalcCountState = initialState, action: CardsTotalcCountAction): CardsTotalcCountState => {
  switch (action.type) {
    case CardsTotalcCountActionType.ADD_COUNT:
      return { ...state, count: state.count + action.payload }
    case CardsTotalcCountActionType.REMOVE_COUNT:
      return { ...state, count: state.count - action.payload }
    case CardsTotalcCountActionType.SET_COUNT:
      return { ...state, count: action.payload }
    default:
      return state
  }
}