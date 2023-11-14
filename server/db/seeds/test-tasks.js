export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    { id: 1, task: 'dont die' },
    { id: 2, task: 'make sure you aint dead' },
  ])
}
