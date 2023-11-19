import { Todo, NewTodo } from '../../models/Todo'
interface Props {
  task: Todo['task']
}

export default function TodoItem(props: Props) {
  return (
    <>
      <p>{props.task}</p>
    </>
  )
}
