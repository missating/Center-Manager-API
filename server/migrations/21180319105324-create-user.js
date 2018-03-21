module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    profileImage: {
      type: Sequelize.STRING,
      allowNull: false
    },

    fullname: {
      type: Sequelize.STRING,
      allowNull: false
    },

    username: {
      type: Sequelize.STRING,
      allowNull: false
    },

    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
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

