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
        dispatch(actionDeleteSpot(spotId));
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

            const imageData =
            {url : data.url,
            preview: true
            }
            dispatch(thunkCreateNewSpotImage(imageData, newSpot));
            return newSpot;
        }

    } catch (error) {
        const err = await error.json();
        console.log(err);
        return err;
    }
};


export const thunkCreateNewSpotImage = (imageInfo, spot) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imageInfo)
        })

        if(res.ok) {
        const image = await res.json();
            dispatch(thunkGetSingleSpot(spot.id));
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
            dispatch(actionEditSpot(editedSpot));
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
            let spotsObj = {};
            action.payload.Spots.forEach(spot => {
                spotsObj[spot.id] = spot
            });
            return {...state, allSpots: {...spotsObj}}
        };
        case GET_SINGLE_SPOT :{
            return {...state, singleSpot :  action.spot }  //this single spot is accurate
        };
        case CREATE_NEW_SPOT : {
            return {...state, singleSpot: { [action.spot.id] : action.spot}} //singleSpot should only be set to the spot object, not the ID => action.spot
        };
        case EDIT_EXISTING_SPOT : {
            console.log('this is the action', action.spot);
            return {...state, singleSpot : action.spot }
        };
        case DELETE_SPOT : {
            const  newState = {...state, allSpots: {...state.allSpots}}
            delete newState.allSpots[action.spotId]
            return newState
        };
        default:
             return state
    }
};
