import { useState } from 'react'
import { Todo, NewTodo } from '../../models/Todo'
import useTodos from '../hooks/useTodos'
interface Props {
  todo: Todo
}

export default function TodoItem(props: Props) {
  const [edit, setEdit] = useState(false)
  const { updateMutation } = useTodos()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const newTodo = form.get('todo')
    updateMutation({ ...props.todo, task: newTodo })
    setEdit(false)
  }

  if (edit) {
    return (
      <form onSubmit={(event) => handleSubmit(event)}>
        <input name="todo" defaultValue={props.todo.task} />
      </form>
    )
  }
  return (
    <div>
      <p
        className={props.todo.completed ? 'isDone' : 'isNotDone'}
        onDoubleClick={() => setEdit(true)}
      >
        {props.todo.task}
      </p>
    </div>
  )
}
