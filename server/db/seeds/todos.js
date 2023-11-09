/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()
  await knex('todos').insert([
    { id: 1, taskDetails: 'do coding lesson', completed: 'Yes', priority: 5 },
    { id: 2, taskDetails: 'do the dishes', completed: 'No', priority: 4 },
    { id: 3, taskDetails: 'do the laundary', completed: 'Yes', priority: 2 },
  ])
}
