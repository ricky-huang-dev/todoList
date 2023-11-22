export function up(knex) {
  return knex.schema.createTable('todo', function (table) {
    table.increments('id').primary()
    table.string('task').notNullable()
    table.boolean('completed').notNullable().defaultTo(false)
    table.timestamps(true, true) // Adds created_at and updated_at columns
  })
}

export function down(knex) {
  return knex.schema.dropTable('todo')
}
