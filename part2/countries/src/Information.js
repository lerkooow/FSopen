import Weather from './Weather';

const Information = ({ error, value, filteredCountries, expandedCountry, handleShowClick }) => {

    return (
        <div>
            {error && <p>{error}</p>}
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
                                </div>
                            }
                            {(expandedCountry === country.name.common || filteredCountries.length === 1) && (
                                <div className="information">
                                    <h1>{country.name.common}</h1>
                                    <p>capital {country.capital}</p>
                                    <p>area {country.area}</p>
                                    <div>
                                        <strong>languages:</strong>
                                        <ul>
                                            {Object.values(country.languages).map((language, index) => (
                                                <li key={index}>{language}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <img src={country.flags.png} alt={`${country.name.common} flag`} />
                                    <div>
                                        <Weather capital={country.capital} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>}
        </div>
    )
}

export default Information;