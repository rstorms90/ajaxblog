exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ajaxblog').del()
    .then(function() {
      // Inserts seed entries
      return knex('ajaxblog').insert([
        {id: 1, title: '', content: ''},
        {id: 2, title: '', content: ''},
        {id: 3, title: '', content: ''},
        {id: 4, title: '', content: ''},
        {id: 5, title: '', content: ''}
      ])
      .then(function() {
        // Moves id column (PK) auto-incrementer to correct value after inserts
        return knex.raw("SELECT setval('ajaxblog_id_seq', (SELECT MAX(id) FROM ajaxblog))")
      })
    })
}
