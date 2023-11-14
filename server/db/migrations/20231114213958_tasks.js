export async function up(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id')
    table.string('task_details')
    table.string('priority')
    table.string('completed')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('tasks')
}
