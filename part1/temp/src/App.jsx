import { useState } from 'react'
import './App.css'

const Button = (props) => {
  return(
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const all = [] ;

let positiveNum = 0;

const StatisticLine = (props) => {
  return (
    <>
      <p>{props.text} {props.value}</p>
    </>
  )
}


const Statistic = (props) => {
  if (all.length === 0) {
    return (
     <>
       <p>No feedback given</p>
    </>
    )
  } return(
    <>
     <h1>statistic</h1>
     <StatisticLine text='good' value={props.good} />
     <StatisticLine text='neutral' value={props.neutral} />
     <StatisticLine text='bad' value={props.bad} />
     <StatisticLine text='all' value={props.all} />
     <StatisticLine text='average' value={props.average} />
     <StatisticLine text='positive' value={props.positive + "%"} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => {
    all.push(1)
    positiveNum += 1
    console.log(all)
    return setGood(good+1)
  }

  const badFeedback = () => {
    all.push(-1)
    console.log(all)
    return setBad(bad+1)
  }

  const neutralFeedback = () => {
    all.push(0)
    console.log(all)
    return setNeutral(neutral+1)
  }

  const score = all.length>0 ? all.reduce((a, b) => a += b) / all.length : 0
  
  const positive = positiveNum>0 ? (positiveNum / all.length) * 100 : 0

  return (
    <div>
       <h1>give feedback</h1>
       <Button onClick={goodFeedback} text="good" />
       <Button onClick={neutralFeedback} text="neutral" />
       <Button onClick={badFeedback} text="bad" />
       <Statistic good={good} neutral={neutral} bad={bad} all={all.length} average={score} positive={positive}/>
    </div>
  )
}

export default App