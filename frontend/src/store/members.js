import { csrfFetch } from "./csrf";

const GET_MEMBER='GET_MEMBER'

const grabMembers = (data) => {
    return {
        type: GET_MEMBER,
        payload:data,
      };
}

export const getMembers = (groupId) =>async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}/members`);
    const data = await res.json();
    dispatch(grabMembers(data));
    return data;
};


const initialState = {Members:null};

const memberReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_MEMBER:
            newState = Object.assign({}, action.payload);
            return newState;
        default: return state
    }
}

export default memberReducer