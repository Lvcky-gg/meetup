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

const deleteEvent = (eventId) =>{
    return {
        type:DELETE_EVENT,
        payload:eventId
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
export const createSpecificEvent = (groupId, input) => async dispatch => {
    console.log(typeof (groupId))
    
    const {  name, type, capacity, price, description, startDate, endDate} = input;
    const response = await csrfFetch(`/api/groups/${groupId}/events`, {
      method: "POST",
      body: JSON.stringify({ 
        
        name, 
        venueId:null, 
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

  export const deleteEventById = (eventId) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}`,{
        method:"DELETE"
    })
    dispatch(deleteEvent(eventId))
  }


const initialState = {Events:null}

const eventReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_EVENT:
          newState = {...newState, ...action.payload}
          return newState;
        case ADD_EVENT:
            newState.Events.push(action.payload)
            return newState;
        case DELETE_EVENT:
            newState = Object.assign({}, state)

            for(let i=0; i<newState.Events.length; i++){
                if(newState.Events[i].id === action.payload) {
                    newState.Events.splice([i],1)
                }
            }
            return newState;


        default:return state;
    }
}

export default eventReducer;