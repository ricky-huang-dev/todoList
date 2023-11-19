/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id').primary()
    table.string('taskDetails').notNullable()
    table.boolean('completed').notNullable().defaultTo(false)
    table.integer('priority').notNullable().defaultTo(0)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('todos')
}
