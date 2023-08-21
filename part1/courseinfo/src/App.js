import { useState } from 'react'

const Statistics = ({ value, text }) => {
  return (
    <p> {text} {text === "positive" ? `${value}%` : value}</p>
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

  const totalFeedback = good + neutral + bad;

  return (
    <div>
      <h2>give feetback</h2>

      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <h2>statistic</h2>

      {totalFeedback === 0 ? (
        <h2>No feedback given</h2>
      ) : (
        <>
          <Statistics text={"good"} value={good} />
          <Statistics text={"neutral"} value={neutral} />
          <Statistics text={"bad"} value={bad} />
          <Statistics text={"all"} value={good + neutral + bad} />
          <Statistics text={"average"} value={good + neutral + bad === 0 ? 0 : (good - bad) / (good + neutral + bad)} />
          <Statistics text={"positive"} value={good + neutral + bad === 0 ? 0 : (good / (good + neutral + bad) * 100)} />
        </>
      )}
    </div>
  )
}

export default App