

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

export const getEvents = async dispatch=> {
    const res = await fetch('/api/events')
    const data= await res.json();
    dispatch(grabEvents(data));
    return data;
}

export const getMyEvents = (groupId)  => async dispatch  => {
    const res = await fetch(`api/groups/${groupId}/events`)
    const data= await res.json();
    dispatch(grabEvents(data));
    return data;
}
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