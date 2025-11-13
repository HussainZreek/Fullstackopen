import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form.jsx'
import Content from './components/Content.jsx'

const App = () => {
  const [country, setCountry] = useState(null)
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (country) {
      axios
        .get(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => {
          setCountries(response.data)
        }) 
      }
   }, [country])

  const handleChange = (event) => {
    setValue(event.target.value)
    setCountry(event.target.value)
  }

  const handleShowClick = () => {

  }

  return (
    <div>
     <Form value={value} handleChange={handleChange} />
     <Content countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App