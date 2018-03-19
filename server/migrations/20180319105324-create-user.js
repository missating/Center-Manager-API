module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('User', {
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
      references: {
        model: 'Role',
        key: 'id',
        as: 'roleId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
  down: queryInterface => queryInterface.dropTable('User'),

};

