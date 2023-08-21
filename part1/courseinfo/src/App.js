import React, { useState } from '../../anecdotes/node_modules/@types/react';
import "./App.css"

const StatisticLine = ({ value, text }) => {
  return (
    <table class="table">
      <tbody>
        <tr>
          <td className="text">{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  );
}

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;

  return (
    <div>
      {
        totalFeedback === 0 ? (
          <h2>No feedback given</h2>
        ) : (
          <>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={totalFeedback} />
            <StatisticLine text="average" value={(good - bad) / totalFeedback} />
            <StatisticLine text="positive" value={`${(good / totalFeedback) * 100}%`} />
          </>
        )
      }
    </div>
  );
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}> {text} </button>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>

      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />

      <h2>statistic</h2>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;