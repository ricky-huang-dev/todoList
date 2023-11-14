export function up(knex) {
  return knex.schema.createTable('todos', function (table) {
    table.increments('id').primary()
    table.string('details')
    table.integer('priority')
    table.boolean('completed')
  })
}
export function down(knex) {
  return knex.schema.dropTable('todos')
}
