
const Form = ({newNumber,newPerson, NumberChange, PersonChange, addPerson}) => {
    return(
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson} onChange={PersonChange}/>
        </div>

        <div>
          number: <input value={newNumber} onChange={NumberChange}/>
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

    )
}

export default Form