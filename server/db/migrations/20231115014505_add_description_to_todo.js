export function up(knex) {
  return knex.schema.table('todo', function (table) {
    table.text('description')
  })
}

export function down(knex) {
  return knex.schema.table('todo', function (table) {
    table.dropColumn('description')
  })
}
