import SpotForm from './SpotForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { thunkEditSpot } from '../../store/spotsReducer';


//works
function EditSpotForm({spotObj}) {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  console.log('this is spotObj', spotObj);
  // const [errors, setErrors] = useState({});
  const [address, setAddress] = useState(spotObj.address);
  const [city, setCity] = useState(spotObj.city);
  const [state, setState] = useState(spotObj.state);
  const [country, setCountry] = useState(spotObj.country);
  const [name, setName] = useState(spotObj.name);
  const [description, setDescription] = useState(spotObj.description);
  const [price, setPrice] = useState(spotObj.price);
  const [lat, setLat] = useState(90);
  const [lng, setLng] = useState(90);


if(!spotId || !Object.values(spotObj).length) return null




const handleSubmit = async (e) => {
  e.preventDefault();
  //spread spotObj in
  let spot = { address, city, state, country, name, description, price, lat, lng}
  const updateSpot =  await dispatch(thunkEditSpot( spot, spotId )); //removed spotId
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
