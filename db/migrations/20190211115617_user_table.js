exports.up = function(connection, Promise) {
  // console.log('creating users table...');
  return connection.schema.createTable('users', userTable => {
    userTable
      .string('username')
      .primary()
      .notNullable();
    userTable.string('name').notNullable();
    userTable.string('avatar_url').notNullable();
  });
};

exports.down = function(connection, Promise) {
  // console.log('removing users tables...');
  return connection.schema.dropTable('users');
};