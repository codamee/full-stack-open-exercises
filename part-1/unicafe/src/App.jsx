import { useState } from 'react'

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => {
        setGood(good + 1)
    }

    const handleNeutral = () => {
        setNeutral(neutral + 1)
    }

    const handleBad = () => {
        setBad(bad + 1)
    }

    return (
        <>
            <div>
                <h1>Good Feedback</h1>
                <div>
                    <button onClick={handleGood}>good</button>
                    <button onClick={handleNeutral}>neutral</button>
                    <button onClick={handleBad}>bad</button>
                </div>
                <h1>Statistics</h1>
                <div>
                    <p>good : {good}</p>
                    <p>neutral : {neutral}</p>
                    <p>bad : {bad}</p>
                </div>
            </div>
        </>
    )
}

export default App