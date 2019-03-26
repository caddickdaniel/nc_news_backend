exports.up = function (connection, Promise) {
  return connection.schema.createTable('articles', (articleTable) => {
    articleTable.increments('article_id').primary();
    articleTable.text('title').notNullable();
    articleTable.text('body');
    articleTable.integer('votes').defaultTo(0);
    articleTable
      .string('topic')
      .references('slug')
      .inTable('topics')
      .onDelete('CASCADE');
    articleTable
      .string('author')
      .references('username')
      .inTable('users')
      .onDelete('CASCADE');
    articleTable.timestamp('created_at').defaultTo(connection.fn.now());
  });
};

exports.down = function (connection, Promise) {
  return connection.schema.dropTable('articles');
};
