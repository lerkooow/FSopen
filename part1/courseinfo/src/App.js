import { useState } from 'react'

const Statistics = ({ score, text }) => {
  return (
    <p> {text} {text === "positive" ? `${score}%` : score}</p>
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
      <h2>give feetback</h2>

      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <h2>statistic</h2>

      <Statistics text={"good"} score={good} />
      <Statistics text={"neutral"} score={neutral} />
      <Statistics text={"bad"} score={bad} />
      <Statistics text={"all"} score={good + neutral + bad} />
      <Statistics text={"average"} score={good + neutral + bad === 0 ? 0 : (good - bad) / (good + neutral + bad)} />
      <Statistics text={"positive"} score={good + neutral + bad === 0 ? 0 : (good / (good + neutral + bad) * 100)} />

    </div>
  )
}

export default App