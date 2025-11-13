

const Total = ({parts}) => {
  const sum = parts.reduce((acc, parts) => acc + parts.exercises , 0)
  return (
    <div>
      <p><strong>total of {sum} exercises</strong></p>
    </div>
    
  )
}

export default Total