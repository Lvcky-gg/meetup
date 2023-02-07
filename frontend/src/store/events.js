import { csrfFetch } from "./csrf"

const ADD_EVENT = 'ADD_EVENT'
const EDIT_GEVENT='EDIT_EVENT'
const GET_EVENT='GET_EVENT'
const DELETE_EVENT='DELETE_EVENT'


const grabEvents = (data) => {
    return {
        type: GET_EVENT,
        payload:data,
      };
}
const addEvents = (data) => {
    return {
        type:ADD_EVENT,
        payload:data,
    }
}

export const getEvents = async dispatch=> {
    const res = await fetch('/api/events')
    const data= await res.json();
    dispatch(grabEvents(data));
    return data;
}

export const getMyEvents = (groupId)  => async dispatch  => {
    const res = await csrfFetch(`api/groups/${groupId}/events`)
    const data= await res.json();
    dispatch(grabEvents(data));
    return data;
}

export const createEvent = (eventId, input) => async dispatch => {
    const { venueId, name, type, capacity, price, description, startDate, endDate} = input;
    const response = await csrfFetch(`/api/groups/${eventId}/events`, {
      method: "POST",
      body: JSON.stringify({ venueId, 
            name, 
            type, 
            capacity, 
            price, 
            description,
            startDate, 
            endDate}),
    });
    const data = await response.json();
    console.log(name)
    dispatch(addEvents(data));
    return response;
  };
const initialState = {Events:null}

const eventReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_EVENT:
          newState = Object.assign({}, action.payload);
          return newState;
        default:return state;
    }
}

export default eventReducer;