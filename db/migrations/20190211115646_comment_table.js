exports.up = function(connection, Promise) {
  // console.log('creating comments table...');
  return connection.schema.createTable('comments', commentTable => {
    commentTable.increments('comment_id').primary();
    commentTable
      .string('username')
      .references('username')
      .inTable('users')
      .onDelete('CASCADE');
    commentTable
      .integer('article_id')
      .references('article_id')
      .inTable('articles')
      .onDelete('CASCADE');
    commentTable.integer('votes').defaultTo(0);
    commentTable.timestamp('created_at').defaultTo(connection.fn.now());
    commentTable.text('body');
  });
};

exports.down = function(connection, Promise) {
  // console.log('removing comments table...');
  return connection.schema.dropTable('comments');
};
