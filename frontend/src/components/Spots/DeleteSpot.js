import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkDeleteSpot } from '../../store/spotsReducer';
import { useParams } from 'react-router-dom';


//not working
function DeleteSpot() {
const { spotId } = useParams();


  return (
    <>
    <div>DeleteSpot</div>
    <button></button>
    </>

  )
};

export default DeleteSpot
