export async function seed(knex) {
  await knex('tasks').del()
  await knex('tasks').insert([
    {
      description: 'Wash the car',
      completed: false,
      priority: 0,
    },
    {
      description: 'Walk dog',
      completed: true,
      priority: 1,
    },
    {
      description: 'Do groceries',
      completed: false,
      priority: 0,
    },
    {
      description: 'Get WoF',
      completed: false,
      priority: 1,
    },
  ])
}
