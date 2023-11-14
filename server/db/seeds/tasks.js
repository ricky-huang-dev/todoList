export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    { task_details: 'Make a database', priority: 'urgent', completed: 'yes' },
    {
      task_details: 'Buy Christmas presesnts',
      priority: 'non-urgent',
      completed: 'no',
    },
    {
      task_details: 'Make a chocolate cake for Pathik',
      priority: 'non-urgent',
      completed: 'no',
    },
    {
      task_details: 'Arrange lunch with Milly',
      priority: 'urgent',
      completed: 'no',
    },
  ])
}
