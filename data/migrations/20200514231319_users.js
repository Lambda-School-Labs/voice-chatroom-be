exports.up = async function (knex, promise) {
  await knex.schema
    .createTable('users', (tbl) => {
    tbl.increments('id').unsigned().primary();
    tbl.string('email').unique().notNullable();
    tbl.string('given_name').notNullable();
    tbl.string('family_name').notNullable();
    tbl.string('username');
    tbl.string('location');
    tbl.string('interest_1');
    tbl.string('interest_2');
    tbl.string('interest_3');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.binary('avatar');
    tbl.boolean('isMentor')
    .defaultTo(false);
  })

  .createTable('categories', tbl =>{
    tbl.increments('id')
    .unsigned()
    .primary()
    tbl.string('category_name')

  })

  .createTable('mentors', tbl =>{
    tbl.increments('id')
    .unsigned()
    .primary()

    tbl.string('mentor_id')
    .unsigned()
    // .references('id')
    // .inTable('users');

    // user info to carry over?
    tbl.string('email')
    tbl.string('given_name')
    tbl.string('family_name')
    tbl.string('username');
    tbl.string('location');
    tbl.binary('avatar')
    tbl.timestamp('created_at').defaultTo(knex.fn.now())

    // categories
    tbl.string('category_1')
    tbl.string('category_2')
    tbl.string('category_3')
    

    tbl.string('mentor_rating');

    // tbl.string('mentee_list')
   
  })



  
};

exports.down = async function (knex, promise) {
  await knex.schema
  // .dropTableIfExists('mentor_categories')
  // .dropTableIfExists('user_interests')
  // .dropTableIfExists('mentee_list')
  .dropTableIfExists('mentors')
  .dropTableIfExists('categories')
  .dropTableIfExists('users');
};
