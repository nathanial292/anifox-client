import { ADD_TODO, TOGGLE_TODO } from "../actions/actionTypes"
import { combineReducers } from 'redux'

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { item: action.item, completed: false }]

    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return {...todo, completed: !todo.completed}
        }
        return todo
      })

    default:
      return state
  }
}

const todoApp = combineReducers({
  todos
})

export default todoApp