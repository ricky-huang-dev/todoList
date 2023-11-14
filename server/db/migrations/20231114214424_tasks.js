export function up(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id')
    table.string('task')
    table.string('details')
    table.boolean('completed')
  })
}

export function down(knex) {
  knex.schema.dropTable('tasks')
}
