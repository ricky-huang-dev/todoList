/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    { priority: 'High', details: ' Vaccum', completed: false },
    { priority: 'Low', details: 'Clean Room', completed: false },
    { priority: 'High', details: ' Do the dishes', completed: false },
    { priority: 'Low', details: 'Brush teeth', completed: true },
  ])
}
