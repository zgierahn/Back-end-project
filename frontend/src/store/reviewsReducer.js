import { csrfFetch } from "./csrf";

//types
const GET_ALL_REVIEWS = 'reviews/GetAllReviews';
// const GET_SINGLE_SPOT = 'spots/GetSingleSpot';
// const EDIT_EXISTING_SPOT = 'spots/EditExistingSpot';
// const CREATE_NEW_SPOT = 'spots/CreateNewSpot';
// const DELETE_SPOT = 'spots/DeleteSpot';
// const CREATE_SPOT_IMAGE = 'spots/CreateImage';

//action functions
export const actionGetReviews = (payload) => ({
    type: GET_ALL_REVIEWS,
    payload
});

// export const actionGetSingleSpot = (spot) => ({
//     type: GET_SINGLE_SPOT,
//     spot
// });

// export const actionEditSpot = (spot) => ({
//     type: EDIT_EXISTING_SPOT,
//     spot
// });

// export const actionCreateSpot = (spot) => ({
//     type: CREATE_NEW_SPOT,
//     spot
// });

// export const actionDeleteSpot = (spotId) => ({
//     type: DELETE_SPOT,
//     spotId
// });

// export const actionCreateSpotImage = (image) => ({
//     type: CREATE_SPOT_IMAGE,
//     image
// });


//thunk funcs
export const thunkGetUserReviews = () => async (dispatch) => {
    const res = await fetch('/api/reviews/current');

    if(res.ok) {
        const response = await res.json();
        dispatch(actionGetReviews(response));

        return response;
    }
}

// export const thunkGetReviewsBySpot = () => async (dispatch) => {
//     const res = await fetch('/api/spots');

//     if(res.ok) {
//         const response = await res.json();
//         dispatch(actionGetSpots(response));

//         return response;
//     }
// }


// export const thunkDeleteSpot = (spotId) => async (dispatch) => {
//     try {
//     const res = await csrfFetch(`/api/spots/${spotId}`,{
//         method: 'DELETE'
//     });

//     if(res.ok) {
//         const spot = await res.json();
//         dispatch(actionDeleteSpot(spot));
//         return spot;
//     }
//     } catch (error) {
//         const err = await error.json();
//         console.log(err);
//         return err;
//     }
// };


// export const thunkCreateNewSpot = (data) => async (dispatch) => {
//     try {
//         const res = await csrfFetch('/api/spots', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         })

//         if(res.ok) {
//         const newSpot = await res.json();
//             dispatch(actionCreateSpot(newSpot));
//             return newSpot;
//         }

//     } catch (error) {
//         const err = await error.json();
//         console.log(err);
//         return err;
//     }
// };


const intitialState = {
    spot: {},
    user: {}

};


//reducers
export default function ReviewsReducer (state = intitialState, action) {
    switch(action.type) {
        case GET_ALL_REVIEWS :{
            console.log('===============================================');
            console.log('i need to see these two', state, action);
            return {...state, spot: {...action.payload}}
        };
        // case GET_SINGLE_SPOT :{
        //     return {...state, singleSpot :  action.spot }
        // };
        // case CREATE_NEW_SPOT : {
        //     return {...state, singleSpot: { [action.spot.id] : action.spot}}
        // }
        // //in progress
        // case CREATE_SPOT_IMAGE : {
        //     return {...state, singleSpot: action.singleSpot.image}
        // }
        // case EDIT_EXISTING_SPOT : {
        //     return {...state, singleSpot: { [action.spot.id] : action.spot}}
        // }

        // case DELETE_SPOT : {
        //     const  newState = {...state}
        //     delete newState.allSpots[action.spotId]
        //     return newState
        // }
        default:
             return state
    }
};
