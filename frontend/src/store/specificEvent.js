import { csrfFetch } from "./csrf";

const GET_EVENT_BY_ID = "GET_EVENT_BY_ID";
const ADD_EVENT_IMG ="ADD_EVENT_IMG";
const REMOVE_EVENT_IMG ="REMOVE_EVENT_IMG";

const deleteEventImg = (imgId) => {
    return {
        type: REMOVE_EVENT_IMG,
        payload:imgId
    }
};

const addEventImage = (data) => {
    return {
        type:ADD_EVENT_IMG,
        payload:data
    }
}

const grabSpecificEvent = (data) => {
    return {
        type:GET_EVENT_BY_ID,
        payload:data
    }
}

export const deleteEventImgById = (imgId) => async (dispatch) => {

    const res = await csrfFetch(`/api/event-images/${imgId}`,{
        method:'DELETE'
    });
    dispatch(deleteEventImg(imgId));
    return res;
};

export const getEventById = (eventId) => async (dispatch) => {

    const res = await csrfFetch(`/api/events/${eventId}`);
    const data = await res.json();
    dispatch(grabSpecificEvent(data))
    return data;
};

export const addImgEvent = (input, eventId) => async dispatch => {
    const { url, preview } = input
    const res = await csrfFetch(`/api/events/${eventId}/images`,{
        method:"POST",
        body:JSON.stringify({
            url,
            preview
        })
    })
    const data = await res.json();
    dispatch(addEventImage(data));
    return res;
};

const initialState = {EventSpecific:null};

const singleEventReducer = (state=initialState, action) => {
    let newState = {...state};

    switch(action.type){
        case GET_EVENT_BY_ID:
            newState = {...newState, ...action.payload};
        return newState;
        case ADD_EVENT_IMG:
            newState.EventImages.push(action.payload);
        case REMOVE_EVENT_IMG:
            
            for(let i = 0; i <newState.EventImages.length; i++){
                if(newState.EventImages[i].id === action.payload){
                    newState.EventImages.splice([i],1)
                }
            }
            return newState;

        default: return state;
    }
};

export default singleEventReducer;