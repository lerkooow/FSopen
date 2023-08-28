import { useState, useEffect } from 'react';
import axios from 'axios';
import Information from './Information';


const App = () => {
  const [value, setValue] = useState("");
  const [info, setInfo] = useState([]);
  const [expandedCountry, setExpandedCountry] = useState(null);


  useEffect(() => {
    if (value.length > 0) {
      axios
        .get(`https://restcountries.com/v3.1/name/${value}`)
        .then(response => {
          setInfo(response.data);
        })
        .catch(error => {
          console.log("Not found country");
        })
    }
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleShowClick = (countryName) => {
    setExpandedCountry(countryName === expandedCountry ? null : countryName);
  };

  const filteredCountries = info.filter(country =>
    country.name?.common.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div>
      <div className="find">
        <p>Find countries</p>
        <input value={value} onChange={handleChange} />
      </div>
      <Information expandedCountry={expandedCountry} handleShowClick={handleShowClick} filteredCountries={filteredCountries} value={value} />
    </div>
  );
};

export default App;
