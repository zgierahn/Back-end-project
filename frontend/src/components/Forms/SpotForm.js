import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import thunkCreateNewSpot from '../../store/spotsReducer';



function SpotForm({ formType }) {
  const dispatch = useDispatch();
  // const [errors, setErrors] = useDispatch({});
  const [address, setAddres] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [lat, setLat] = useState(90);
  const [lng, setLng] = useState(90);



function handleSubmit(e) {
  e.preventDefault();
  // setErrors({});

if (formType === "Edit Spot") { //change this crap to be for this file
  // const editedReport = await dispatch(thunkCreateNewSpot(report));
  // report = editedReport;
} else if (formType === "Create Spot") {
  // const newReport = await dispatch(thunkCreateNewSpot(report));
  // report = newReport;
}

// if (report.errors) {
//   setErrors(report.errors);
// } else {
//   history.push(`/reports/${report.id}`);
// }

}


  return (
    <form>
      <h2>{formType}</h2>
      {/* <div className="errors">{errors.understanding}</div> */}
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddres(e.target.value)}
        />
      </label>
      {/* <div className="errors">{errors.improvement}</div> */}
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <label>
        State:
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>

      <button type="submit" onClick={handleSubmit}>Show me the money!</button>
    </form>
  )
};

export default SpotForm
