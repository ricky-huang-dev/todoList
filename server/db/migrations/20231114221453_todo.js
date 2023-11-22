export function up(knex) {
  return knex.schema.createTable('todo', function (table) {
    table.increments('id').primary()
    table.string('task')
    table.boolean('completed').notNullable().defaultTo(false)
  })
}

export function down(knex) {
  return knex.schema.dropTable('todo')
}
