

const ADD_GROUP = 'ADD_GROUP'
const EDIT_GROUP='EDIT_GROUP'
const GET_GROUP='GET_GROUP'
const DELETE_GROUP='DELETE_GROUP'

const grabGroups = (data) => {
    return {
        type: GET_GROUP,
        payload:data,
      };
}

export const getGroups = async dispatch=> {
    const res = await fetch('/api/groups')
    const data= await res.json();
    dispatch(grabGroups(data));
    return data;
}

export const getMyGroups = async dispatch=> {
    const res = await fetch('api/groups/current')
    const data= await res.json();
    dispatch(grabGroups(data));
    return data;
}
const initialState = {Groups:null}

const groupReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_GROUP:
          newState = Object.assign({}, action.payload);
          return newState;
        default:return state;
    }
}

export default groupReducer;