import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTodo } from '../apis/todos'
import { NewTodo } from '../../models/todos'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer className="footer">
        <span className="todo-count">
          <strong>0</strong> item left
        </span>
        <ul className="filters">
          <li>
            <a className="selected" href="#/">
              All
            </a>
          </li>
          <li>{/* <Link to="#/active">Active</Link> */}</li>
          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>
        <button className="clear-completed">Clear completed</button>
      </footer>
    </>
  )
}

export default Footer
