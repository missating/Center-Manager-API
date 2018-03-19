module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    fullname: {
      type: Sequelize.STRING,
      allownull: false
    },

    username: {
      type: Sequelize.STRING,
      allownull: false
    },

    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      isEmail: true
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    roleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Roles',
        key: 'id',
        as: 'roleId'
      }
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },

    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Users'),

};

