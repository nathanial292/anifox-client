import { ADD_TODO, TOGGLE_TODO } from './actionTypes'

const addTodo = (item) => {
    return { type: ADD_TODO, item }
}

const toggleTodo = (index) => {
    return { type: TOGGLE_TODO, index }
}

export { addTodo, toggleTodo }