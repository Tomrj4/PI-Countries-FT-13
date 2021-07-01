import{ COUNTRY_DETAIL, GET_COUNTRIES,GET_ACTIVITY } from '../actions/index'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

const initialState = {
    countries: [],
    countryDetail: {},
    activities:[]
}

function reducer(state= initialState, action ) {
    switch (action.type) {
        case GET_COUNTRIES:{
            return {
                ...state,
                countries: action.payload
            }
        }
        case GET_ACTIVITY:{
            return {
                ...state,
                activities: action.payload
            }
        }
        case COUNTRY_DETAIL : {
            return {
                ...state,
                countryDetail: action.payload
            }
        }
        default :{
            return state
        }
    }
}
const store=createStore(reducer, applyMiddleware(thunk))

export default store;