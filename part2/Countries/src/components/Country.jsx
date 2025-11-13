const Country = ({country}) => {
  if (country) {return (
   <div>
    <h1>{country.name.common}</h1>
    <p>Capital {country.capital}</p>
    <p>Area {country.area}</p>
    <h3>Languages</h3>
    <ul>
      {Object.values(country.languages).map((language, i) => (
        <li key={i}>{language}</li>
      ))}
    </ul>
    <p style={{ fontSize: "4rem" }}>{country.flag}</p>
   </div>
  )}
}

export default Country