import * as models from '../models/models.ts'
import Tasks from './Tasks.tsx'

interface Props {
  tasks: models.Task[]
}

function MainSection(props: Props) {
  const tasks = props.tasks

  return (
    <>
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">

          <li className="completed">
            <div className="view"></div> 
          </li>
          <Tasks tasks={tasks} />
        </ul>
      </section>
    </>
  )
}

export default MainSection