import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          console.log("Not found")
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
      {value !== "" && <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          filteredCountries.map((country) => (
            <div className="country" key={country.name.common}>
              {(filteredCountries.length < 10 && filteredCountries.length !== 1) &&
                <div className="show">
                  <p>{country.name.common}</p>
                  <button onClick={() => handleShowClick(country.name.common)}>
                    {expandedCountry === country.name.common ? "hide" : "show"}
                  </button>
                </div>}
              {(expandedCountry === country.name.common || filteredCountries.length === 1) && (
                <div className="information">
                  <h1>{country.name.common}</h1>
                  <p>capital {country.capital}</p>
                  <p>area {country.area}</p>
                  <p>
                    <strong>languages:</strong>
                    <ul>
                      {Object.values(country.languages).map((language, index) => (
                        <li key={index}>{language}</li>
                      ))}
                    </ul>
                  </p>
                  <img src={country.flags.png} alt={`${country.name.common} flag`} />
                </div>
              )}
            </div>
          ))
        )}
      </div>}
    </div>
  );
};

export default App;
