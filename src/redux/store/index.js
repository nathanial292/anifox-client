import { createStore } from 'redux'
import todoApp from '../reducers'
import { addTodo, toggleTodo } from '../actions'

const store = createStore(todoApp)

console.log(store.getState())

const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(addTodo('Eat jelly tomorrow'))
store.dispatch(addTodo('Complete coursework'))
store.dispatch(addTodo('Do some fitness'))
store.dispatch(addTodo('Revise'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))

unsubscribe()

export default store