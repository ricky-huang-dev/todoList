import { Todo, NewTodo } from '../../models/Todo'
interface Props {
  task: Todo['task']
}

export default function TodoItem(props: Props) {
  return (
    <li>
      <div>
        <p>{props.task}</p>
      </div>
    </li>
  )
}
