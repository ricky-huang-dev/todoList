export async function up(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary()
    table.string('text').notNullable()
    table.integer('priority').notNullable().defaultTo(0)
    table.boolean('completed').notNullable().defaultTo(false)
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('tasks')
}
