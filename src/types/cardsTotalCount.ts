export interface CardsTotalcCountState {
  count: number
}

export enum CardsTotalcCountActionType {
  ADD_COUNT = "ADD_COUNT",
  REMOVE_COUNT = "ADD_COUNT",
  SET_COUNT = "SET_COUNT",
}

interface AddCardsTotalcCountAction {
  type: CardsTotalcCountActionType.ADD_COUNT
  payload: number;
}

interface RemoveCardsTotalcCountAction {
  type: CardsTotalcCountActionType.REMOVE_COUNT
  payload: number;
}

interface SetCardsTotalcCountAction {
  type: CardsTotalcCountActionType.SET_COUNT
  payload: number;
}

export type CardsTotalcCountAction = AddCardsTotalcCountAction | RemoveCardsTotalcCountAction | SetCardsTotalcCountAction;