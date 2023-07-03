import SpotForm from './SpotForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { thunkEditSpot, thunkGetSingleSpot } from '../../store/spotsReducer';



function EditSpotForm() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  // let spot = useSelector(state => state.spots.singleSpot[spotId])

  // const [errors, setErrors] = useState({});
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [lat, setLat] = useState(90);
  const [lng, setLng] = useState(90);


  useEffect(()=> {
    // (async () => {
    dispatch(thunkGetSingleSpot(spotId))  //removed dispatch
    // })()
  }, []);




const handleSubmit = async (e) => {
  e.preventDefault();
  let spot = {address, city, state, country, name, description, price, lat, lng}
  const updateSpot =  await dispatch(thunkEditSpot(spot));
  console.log('this the new spot', updateSpot);
};

  return (
    <form>
      <h2>Edit Form</h2>
        <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      {/* {errors.address && <div className="errors">{errors.address}</div>} */}
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      {/* {errors.city && <div className="errors">{errors.city}</div>} */}
      <label>
        State:
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
      {/* {errors.state && <div className="errors">{errors.state}</div>} */}
      <label>
        Country:
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      {/* {errors.country && <div className="errors">{errors.country}</div>} */}
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      {/* {errors.name && <div className="errors">{errors.name}</div>} */}
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      {/* {errors.description && <div className="errors">{errors.description}</div>} */}
      <label>
        Price:
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      {/* {errors.price && <div className="errors">{errors.price}</div>} */}

      <button type="submit" onClick={handleSubmit}>Show me the money!</button>
    </form>
  )
};

export default EditSpotForm
