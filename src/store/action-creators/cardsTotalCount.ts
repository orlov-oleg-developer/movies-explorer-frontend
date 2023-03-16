import { CardsTotalcCountActionType } from '../../types/cardsTotalCount'

export const addCardsTotalCount = (count: number) => {
  return { type: CardsTotalcCountActionType.ADD_COUNT, payload: count }
}

export const removeCardsTotalCount = (count: number) => {
  return { type: CardsTotalcCountActionType.REMOVE_COUNT, payload: count }
}

export const setCardsTotalCount = (count: number) => {
  return { type: CardsTotalcCountActionType.SET_COUNT, payload: count }
}