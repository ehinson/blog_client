import React, {useReducer} from "react"

userReducer(state, action) {
  switch(action.type) {
    case 'updateValue':
      return {
        ...state,
        value: action.payload
      }
    default:
      return state
  }
}

export default userReducer


