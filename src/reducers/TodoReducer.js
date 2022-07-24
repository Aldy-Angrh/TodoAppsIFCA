import {ADD_TODO, EDIT_TODO, GET_WHEATER_DATA, GET_WHEATER_ERROR} from '../actions';

let initialState = {
  todos: [],
  editData: null,
  getWheaterData: false,
  getWhaterError: false,
};

const TodoReducer = (state = initialState, action) => {
  console.log('DI REDUCER TODO', action);
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case EDIT_TODO:
      return {
        editData: action.payload,
      };
    case GET_WHEATER_DATA:
        console.log("CASE WHEATER");
      return {
        ...state,
        getWheaterData: action.payload.getWheaterData,
        getWhaterError: action.payload.getWhaterError,
      };
    default:
      return state;
  }
};

export default TodoReducer;
