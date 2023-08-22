import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [value, setValue] = useState("");
  const [info, setInfo] = useState([]);

  useEffect(() => {
    if (value.length > 0) {
      console.log('fetching country info...');
      axios
        .get(`https://restcountries.com/v3.1/name/${value}`)
        .then(response => {
          setInfo(response.data);
        })
        .catch(error => {
          console.error('Error fetching country info:', error);
          setInfo([]);
        });
    }
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const filteredCountries = info.filter(country =>
    country.name?.common.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div>
      <div>
        <p>Find countries</p>
        <input value={value} onChange={handleChange} />
      </div>
      <div>
        {filteredCountries.length === 1 ? (
          filteredCountries.map((country) => (
            <div className="information">
              <h1>{country.name.common}</h1>
              <p>capital {country.capital}</p>
              <p>area {country.area}</p>
              <p>
                <ul>
                  {filteredCountries.map(country => (
                    <p key={country.name.common}>
                      {Object.values(country.languages).map((language, index) => (
                        <li key={index}>{language}</li>
                      ))}
                    </p>
                  ))}
                </ul>
              </p>
              <p>{country.flag}</p>
            </div>
          ))
        ) : (
          filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : (
            filteredCountries.map((country) => (
              <p key={country.name.common}>{country.name.common}</p>
            ))
          )
        )}
      </div>
    </div >
  );
};

export default App;