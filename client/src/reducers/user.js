import { REGISTER } from '../actions/types';

export default function userReducer (state = {}, action) {
  const { type } = action
  switch (type) {
    case REGISTER:
      return {
        ...state,
        apiErrors: action.error
      }
    default:
      return state
  }
}