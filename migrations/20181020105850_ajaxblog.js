exports.up = function(knex, Promise) {
  return knex.schema.createTable('ajaxblog', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('title').notNullable().defaultTo('')
    table.text('content').notNullable().defaultTo('')
    table.timestamps(true, true)
    // OR
    // table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
    // table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ajaxblog')
}
