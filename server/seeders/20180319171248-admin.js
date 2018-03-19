module.exports = {
  up: queryInterface => queryInterface.bulkInsert('User', [{
    fullname: 'Admin',
    username: 'Admin',
    email: 'admin@eventmanager.com',
    password: process.env.ADMIN_PASSWORD,
    roleId: 1,
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('User', null, {})
};
