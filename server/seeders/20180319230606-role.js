module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Roles', [
    {
      title: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      title: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },

  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Roles', null, {})
};
