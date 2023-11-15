/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('todosTable').del()
  await knex('todosTable').insert([
    {
      id: 1,
      taskDetails: 'create a todos table',
      priority: '1',
      completed: false,
    },
    {
      id: 2,
      taskDetails: 'create server side routes',
      priority: '2',
      completed: false,
    },
  ])
}
