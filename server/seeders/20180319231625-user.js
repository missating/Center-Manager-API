const bcrypt = require('bcrypt');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        profileImage: `https://res.cloudinary.com/dxayftnxb/image/upload
        /v1521588039/profile-icon-9_njp1mb.png`,
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
