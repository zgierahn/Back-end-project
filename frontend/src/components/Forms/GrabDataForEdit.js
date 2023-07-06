import { thunkGetSingleSpot, thunkGetSpots } from "../../store/spotsReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditSpotForm from "./EditSpotForm";


function GrabDataForEdit() {
const dispatch = useDispatch();
const { spotId } = useParams();


useEffect(()=> {
  dispatch(thunkGetSingleSpot(spotId))

}, [dispatch, spotId]);


let spotObj = useSelector(state => state.spots.singleSpot);
    console.log('test', spotObj);
    console.log('grab data for edit rendered');

if(!spotId || !Object.values(spotObj).length) return null

  return (

    <EditSpotForm spotObj={spotObj} />

  )
}

export default GrabDataForEdit
