const Header = (params) => {
  return <h1>{params.course}</h1>
}

const Part = (params) => {
  return <p>
    {params.part} {params.exercise}
  </p>
}

const Content = (params) => {
  const { part1, part2, part3 } = params
  return (
    <>
      <Part part={part1.name} exercise={part1.exercises} />
      <Part part={part2.name} exercise={part2.exercises} />
      <Part part={part3.name} exercise={part3.exercises} />

    </>
  )
}

const Total = (params) => {
  return <p>Number of exercises {params.exercises1 + params.exercises2 + params.exercises3}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total exercises1={part1.exercises} exercises2={part1.exercises} exercises3={part1.exercises} />
    </div>
  )
}

export default App