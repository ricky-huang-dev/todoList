import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todo } from '../../model/todos'
import { deleteTodo, updateTodo } from '../apis/clientApi'
import { useState } from 'react'

export default function TodoItem(props: todo) {
  const [content, setContent] = useState(props.details)
  const [isEdit, setIsEdit] = useState(false)

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => deleteTodo(props.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const updatemutation = useMutation({
    mutationFn: () => updateTodo(props.id, { details: content }),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  function handleDelete(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    mutation.mutate()
  }

  function handleEdit(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    setIsEdit(!isEdit)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    updatemutation.mutate()
    setIsEdit(false)
  }

  return (
    <>
      <li>
        <button onDoubleClick={handleEdit}>
          {isEdit ? (
            <form onSubmit={handleSubmit}>
              <input
                // className="edit"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </form>
          ) : (
            <div className="view">
              <input className="toggle" type="hidden" />
              {props.details}
              <button className="deleteBtn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </button>
      </li>
    </>
  )
}
