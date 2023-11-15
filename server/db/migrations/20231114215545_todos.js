/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('todosTable', (table) => {
    table.increments('id').primary()
    table.string('taskDetails').notNullable()
    table.integer('priority')
    table.boolean('completed').notNullable().defaultTo(false)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('todosTable')
}
