import { csrfFetch } from "./csrf";

//types
const GET_ALL_SPOTS = 'spots/GetAllSpots';
const GET_SINGLE_SPOT = 'spots/GetSingleSpot';
const EDIT_EXISTING_SPOT = 'spots/EditExistingSpot';
const CREATE_NEW_SPOT = 'spots/CreateNewSpot';
const DELETE_SPOT = 'spots/DeleteSpot';
const CREATE_SPOT_IMAGE = 'spots/CreateImage';



//action functions
export const actionGetSpots = (payload) => ({
    type: GET_ALL_SPOTS,
    payload
});

export const actionGetSingleSpot = (spot) => ({
    type: GET_SINGLE_SPOT,
    spot
});

export const actionEditSpot = (spot) => ({
    type: EDIT_EXISTING_SPOT,
    spot
});

export const actionCreateSpot = (spot) => ({
    type: CREATE_NEW_SPOT,
    spot
});

export const actionDeleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
});

export const actionCreateSpotImage = (image) => ({
    type: CREATE_SPOT_IMAGE,
    image
});


//thunk funcs
export const thunkGetSpots = () => async (dispatch) => {
        const res = await fetch('/api/spots');

        if(res.ok) {
            const response = await res.json();
            dispatch(actionGetSpots(response));

            return response;
        }
}


export const thunkGetUserSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots/current');

    if(res.ok) {
        const response = await res.json();
        dispatch(actionGetSpots(response));

        return response;
    }
}


export const thunkGetSingleSpot = (spotId) => async (dispatch) => {
    try {
    const res = await csrfFetch(`/api/spots/${spotId}`);

    if(res.ok) {
        const spot = await res.json();
        dispatch(actionGetSingleSpot(spot));
        return spot;
    }
    } catch (error) {
        const err = await error.json();
        console.log(err);
        return err;
    }
};


export const thunkDeleteSpot = (spotId) => async (dispatch) => {
    try {
    const res = await csrfFetch(`/api/spots/${spotId}`,{
        method: 'DELETE'
    });

    if(res.ok) {
        const spot = await res.json();
        dispatch(actionDeleteSpot(spot));
        return spot;
    }
    } catch (error) {
        const err = await error.json();
        console.log(err);
        return err;
    }
};


export const thunkCreateNewSpot = (data) => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if(res.ok) {
        const newSpot = await res.json();
            dispatch(actionCreateSpot(newSpot));
            return newSpot;
        }

    } catch (error) {
        const err = await error.json();
        console.log(err);
        return err;
    }
};

//in progress
export const thunkCreateNewSpotImage = (data, spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if(res.ok) {
        const image = await res.json();
            dispatch(actionCreateSpotImage(image));
            return image;
        }

    } catch (error) {
        const err = await error.json();
        console.log(err);
        return err;
    }
};


export const thunkEditSpot = (data, spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if(res.ok) {
        const editedSpot = await res.json();
            dispatch(actionCreateSpot(editedSpot));
            return editedSpot;
        }
    } catch (error) {
        const err = await error.json();
        console.log(err);
        return err;
    }
};


const intitialState = {
    allSpots: {},
    singleSpot: {}

};


//reducers
export default function SpotsReducer (state = intitialState, action) {
    switch(action.type) {
        case GET_ALL_SPOTS :{
            return {...state, allSpots: {...action.payload.Spots}}
        };
        case GET_SINGLE_SPOT :{
            return {...state, singleSpot :  action.spot }
        };
        case CREATE_NEW_SPOT : {
            return {...state, singleSpot: { [action.spot.id] : action.spot}}
        }
        //in progress
        case CREATE_SPOT_IMAGE : {
            return {...state, singleSpot: action.singleSpot.image}
        }
        case EDIT_EXISTING_SPOT : {
            return {...state, singleSpot: { [action.spot.id] : action.spot}}
        }

        case DELETE_SPOT : {
            const  newState = {...state}
            delete newState.allSpots[action.spotId]
            return newState
        }
        default:
             return state
    }
};
