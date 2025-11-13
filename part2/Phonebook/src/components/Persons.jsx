import Person from "./Person"

const Persons = ({persons, deletePerson}) => {
    return (
        <ul>
        {persons.map(person => <Person name={person.name} number={person.number} key={person.name} deletePerson={() => deletePerson(person.id)} />)}
        </ul>
    )
}

export default Persons