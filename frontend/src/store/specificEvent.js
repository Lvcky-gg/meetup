import { csrfFetch } from "./csrf";


const ADD_EVENT = 'ADD_EVENT'
const EDIT_GEVENT='EDIT_EVENT'
const GET_SPECIFIC_EVENT='GET_SPECIFIC_EVENT'
const DELETE_EVENT='DELETE_EVENT'


const getSpecificEvent = (data) => {
    return {
        type: GET_SPECIFIC_EVENT,
        payload:data,
      };
};
const addEvents = (data) => {
    return {
        type:ADD_EVENT,
        payload:data
    }
}

export const getEventsForGroup = (groupId) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}/events`)
    const data = await res.json();
console.log('dada', data)
    dispatch(getSpecificEvent(data));
    return data;
}


export const createSpecificEvent = (groupId, input) => async dispatch => {
    const {  name, type, capacity, price, description, startDate, endDate} = input;
    const response = await csrfFetch(`/api/groups/${groupId}/events`, {
      method: "POST",
      body: JSON.stringify({ 
        // venueId, 
        name, 
        type, 
        capacity, 
        price, 
        description,
        startDate, 
        endDate
    }),
    });
    const data = await response.json();
    dispatch(addEvents(data));
    return response;
  };


  const initialState = {Events:null};
  const specificEventReducer = (state = initialState, action) => {
    let newState ={...state};
    
    switch (action.type) {
        case GET_SPECIFIC_EVENT:
            console.log('hello', newState)
            newState =  {...newState, ...action.payload};
            return newState;
        case ADD_EVENT:
             newState.Events.push(action.payload)
            return newState;
 
        default:return state;
    }
}
export default specificEventReducer;