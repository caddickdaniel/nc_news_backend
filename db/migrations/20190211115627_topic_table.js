exports.up = function (connection, Promise) {
  return connection.schema.createTable('topics', (topicTable) => {
    topicTable.string('description').notNullable();
    topicTable
      .string('slug')
      .primary()
      .unique();
  });
};

exports.down = function (connection, Promise) {
  return connection.schema.dropTable('topics');
};
