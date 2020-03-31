import { ADD_TODO, TOGGLE_TODO } from "../actions/actionTypes"
import { addTodo } from "../actions"

const initialState = {
    todos: []
}

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state.todos, { text: action.item, completed: false }]

    case TOGGLE_TODO:
      return state.todos.map((todo, index) => {
        if (index === action.index) {
          return {...todo, completed: !todo.completed}
        }
        return todo
      })

    default:
      return state
  }
}

const todoApp = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TODO:
      return {...state, todos: todos(state.todos, action)}

    case TOGGLE_TODO:
      return {...state, todos: todos(state.todos, action)}
      
    default:
      return state
  }
}