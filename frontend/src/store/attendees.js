import { csrfFetch } from "./csrf";

const GET_ATTENDEE='GET_ATTENDEE'

const grabAttendees = (data) => {
    return {
        type: GET_ATTENDEE,
        payload:data,
      };
}

export const getAttendees = (eventId) =>async dispatch => {
    const res = await csrfFetch(`/api/events/${eventId}/attendees`);
    const data = await res.json();
    dispatch(grabAttendees(data));
    return data;
};


const initialState = {Attendees:null};

const attendeeReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_ATTENDEE:
            newState = Object.assign({}, action.payload);
            return newState;
        default: return state
    }
}

export default attendeeReducer