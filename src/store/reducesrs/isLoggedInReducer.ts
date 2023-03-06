enum isLoggedInActionTypes {
  CHANGE = "CHANGE",
}

interface isLoggedInAction {
  type: isLoggedInActionTypes.CHANGE
}

let initialState: boolean = false;

export const isLoggedInReducer = (state = initialState, action: isLoggedInAction) => {
  switch (action.type) {
    case isLoggedInActionTypes.CHANGE:
      // return !state.isLoggedIn;
    default:
      return state
  }
}
