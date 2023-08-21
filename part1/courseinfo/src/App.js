import { useState } from 'react'

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

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      {good + neutral + bad > 0 ? (
        <p>average {(good - bad) / (good + neutral + bad)}</p>
      ) : (
        <p>average 0</p>
      )}
      {good + neutral + bad > 0 ? (
        <p>positive {good / (good + neutral + bad) * 100}%</p>
      ) : (
        <p>positive 0%</p>
      )}

    </div>
  )
}

export default App