export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()
  await knex('todos').insert([
    { todo_id: 1, task: 'cook', priority: 'ASAP', completed: false },
    { todo_id: 2, task: 'nap', priority: 'ASAP', completed: false },
    { todo_id: 3, task: 'code', priority: 'ASAP', completed: false },
    { todo_id: 4, task: 'eat', priority: 'ASAP', completed: false },
    { todo_id: 5, task: 'walk', priority: 'ASAP', completed: false },
  ])
}
