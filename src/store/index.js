import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import appReducer from './reducers'
import initialData from './initialState'
import constants from '../constants'

const consoleMessages = store => next => action => {
  let result = next(action)
  let state = store.getState()

	console.groupCollapsed(`[Store] Dispatching action => ${action.type}`)
	console.log(JSON.stringify(state, null, 2))
	console.groupEnd()

	return result
}

export const storeFactory = (initialState = {}) => {
	return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
}

export const setupStore = () => {
	const storageData = localStorage[constants.LOCAL_STORAGE_KEY]
	const initialState = (storageData) ? JSON.parse(storageData) : initialData

	const saveState = () =>
			localStorage[constants.LOCAL_STORAGE_KEY] = JSON.stringify(store.getState())

	const store = storeFactory(initialState)
	store.subscribe(saveState)
}

export default setupStore
