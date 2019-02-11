exports.up = function(connection, Promise) {
  // console.log('creating topic table...');
  return connection.schema.createTable('topics', topicTable => {
    topicTable.string('description').notNullable();
    topicTable
      .string('slug')
      .primary()
      .unique();
  });
};

exports.down = function(connection, Promise) {
  // console.log('removing topic table...');
  return connection.schema.dropTable('topics');
};
