export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    { task: 'dont die' },
    { task: 'make sure you aint dead' },
    { task: 'eat dinner b4 you die' },
    { task: 'req dot bodeh mf' },
    { task: 'b patient around da professor' },
  ])
}
