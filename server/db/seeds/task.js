export async function seed(knex) {
  await knex('todo').del()
  await knex('todo').insert([
    {
      task: 'Buy milk',
      completed: false,
    },
    {
      task: 'Do laundry',
      completed: true,
    },
    {
      task: 'Walk the dog',
      completed: true,
    },
  ])
}
