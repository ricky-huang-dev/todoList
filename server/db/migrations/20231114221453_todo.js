export function up(knex) {
  return knex.schema.createTable('todo', function (table) {
    table.increments('id').primary()
    table.string('task')
    table.string('description')
    table.string('status')
    table.date('deadline')
  })
}

export function down(knex) {
  return knex.schema.dropTable('todo')
}
