import { csrfFetch } from './csrf';
const GET_SPECIFIC_GROUP='GET_SPECIFIC_GROUP';

const grabGroup = (data) => {
    return {
        type: GET_SPECIFIC_GROUP,
        payload:data,
      };
};

export const getSpecificGroup = (groupId) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}`)
   
    const data = await res.json()
    console.log(data)
    dispatch(grabGroup(data));
    return data;
}

const initialState = {specificGroup:null};

export const specificGroupReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPECIFIC_GROUP:
            newState = Object.assign({}, action.payload);
            return newState;
        default:return state;
    }
}