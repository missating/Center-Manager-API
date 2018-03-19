const bcrypt = require('bcrypt');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        fullname: 'Default User',
        username: 'admin',
        email: 'admin@eventmanager.com',
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { individualHooks: true });
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
