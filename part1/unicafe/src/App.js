import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = props => <tr><td>{props.text}</td><td>{props.amount}</td></tr>

const Header = ({text}) => <h1>{text}</h1>

const Statistics = (props) => {
  const total = () => props.good + props.neutral + props.bad
  const average = () => {
    return (props.good - props.bad)/total()
  }
  const positive = () => <>{props.good/total()*100} %</>

  if (total() === 0) {
    return (
      <div>
        <Header text="statistics" />
        <>No feedback given.</>
      </div>
    )
  }
  return (
    <div>
      <Header text="statistics" />
      <StatisticsLine text={"good"} amount={props.good} />
      <StatisticsLine text={"neutral"} amount={props.neutral} />
      <StatisticsLine text={"bad"} amount={props.bad} />
      <StatisticsLine text={"all"} amount={total()} />
      <StatisticsLine text={"average"} amount={average()} />
      <StatisticsLine text={"positive"} amount={positive()} />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => { setGood(good+1) }
  const incrementNeutral = () => { setNeutral(neutral+1) }
  const incrementBad = () => { setBad(bad+1) }

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => incrementGood()} text="good" />
      <Button handleClick={() => incrementNeutral()} text="neutral" />
      <Button handleClick={() => incrementBad()} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App