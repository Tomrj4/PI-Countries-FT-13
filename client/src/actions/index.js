import axios from 'axios'
export const GET_COUNTRIES = "GET_COUNTRIES"
export const COUNTRY_DETAIL = "COUNTRY_DETAIL"
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_ACTIVITY= "GET_ACTIVITY"

export function getCountries() {
    return (dispatch) => {
        axios.get('/countries').then(response => {
            dispatch({ type: GET_COUNTRIES, payload: response.data })
        })
    }
}
export function getActivities(){
    return (dispatch) => {
        axios.get('/activity').then(response => {
            dispatch({ type: GET_ACTIVITY, payload: response.data })
        })
    }
}
export function CountryDetail(id) {
    return (dispatch) => {
        axios.get('/countries/' + id).then(response => {
            dispatch({ type: COUNTRY_DETAIL, payload: response.data })
        })
    }
}
export function getByName(name) {
    return (dispatch) => {
        axios.get('/countries?name=' + name).then(response => {
            dispatch({ type: GET_COUNTRIES, payload: response.data })
        })
    }
}