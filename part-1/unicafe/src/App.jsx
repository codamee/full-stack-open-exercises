import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
    return (
        <tr className=' '>
            <td className='border p-1 m-2'>{text}</td>
            <td className='border p-1 m-2'>{value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const { good, neutral, bad, total, average, positivePercentage } = props
    return (
        <div>
            <h1 className='text-blue-800 font-bold p-2 text-xl'>Statistics</h1>
            {
                total > 0 ? <table>
                    <tbody className='border'>
                        <StatisticLine text={"good"} value={good} />
                        <StatisticLine text={"neutral"} value={neutral} />
                        <StatisticLine text={"bad"} value={bad} />
                        <StatisticLine text={"total"} value={total} />
                        <StatisticLine text={"average"} value={average} />
                        <StatisticLine text={"positive"} value={positivePercentage} />
                    </tbody>
                </table> : <div>No Feedback Given</div>
            }
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const total = good + neutral + bad
    const average = total == 0 ? 0 : (good - bad) / total
    const positivePercentage = total === 0 ? 0 : (good / total) * 100

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
            <div className='m-5'>
                <div>
                    <h1 className='text-blue-800 font-bold p-2 text-xl'>Good Feedback</h1>
                    <div>
                        <button className='border m-2 p-2' onClick={handleGood}>good</button>
                        <button className='border m-2 p-2' onClick={handleNeutral}>neutral</button>
                        <button className='border m-2 p-2' onClick={handleBad}>bad</button>
                    </div>
                </div>
                <Statistics good={good} bad={bad} neutral={neutral} positivePercentage={positivePercentage} total={total} average={average} />
            </div>
        </>
    )
}

export default App