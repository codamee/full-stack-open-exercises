const Header = (params) => {
  return <h1>{params.course}</h1>
}

const Part = (params) => {
  return <p>
    {params.part} {params.exercise}
  </p>
}

const Content = (params) => {
  const { courseInfo } = params

  return (
    <>
      <Part part={courseInfo.part1} exercise={courseInfo.exercises1} />
      <Part part={courseInfo.part2} exercise={courseInfo.exercises2} />
      <Part part={courseInfo.part3} exercise={courseInfo.exercises3} />

    </>
  )
}

const Total = (params) => {
  return <p>Number of exercises {params.exercises1 + params.exercises2 + params.exercises3}</p>
}

const App = () => {
  const courseInfo = {
    course: 'Half Stack application development',
    part1: 'Fundamentals of React',
    exercises1: 10,
    part2: 'Using props to pass data',
    exercises2: 7,
    part3: 'State of a component',
    exercises3: 14
  }

  return (
    <div>
      <Header course={courseInfo.course} />
      <Content courseInfo={courseInfo} />
      <Total exercises1={courseInfo.exercises1} exercises2={courseInfo.exercises2} exercises3={courseInfo.exercises3} />
    </div>
  )
}

export default App