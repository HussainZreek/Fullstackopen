const Filter = ({filter, setFilter}) => {

     const handleFilterChange = (event) => {
     console.log(event.target.value)
     setFilter(event.target.value)
  }
    
    return (
         <div>
        filter shown with a <input value={filter} onChange={handleFilterChange} />
         </div>
    )
}


export default Filter

