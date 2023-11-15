export function up(knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('todo_id')
    table.string('task')
    table.string('priority')
    table.boolean('completed')
  })
}

export function down(knex) {
  return knex.schema.dropTable('todos')
}
