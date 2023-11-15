export async function seed(knex) {
  await knex('tasks').del()
  await knex('tasks').insert([
    {
      text: 'Buy milk',
      completed: false,
      priority: 0,
    },
    {
      text: 'Do laundry',
      completed: false,
      priority: 0,
    },
    {
      text: 'Walk the dog',
      completed: true,
      priority: 0,
    },
  ])
}
