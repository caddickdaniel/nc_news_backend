exports.up = function(connection, Promise) {
  return connection.schema.createTable('comments', commentTable => {
    commentTable.increments('comment_id').primary();
    commentTable
      .string('author')
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
  return connection.schema.dropTable('comments');
};
