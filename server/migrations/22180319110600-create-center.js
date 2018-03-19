module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Centers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      location: {
        type: Sequelize.STRING,
        allowNull: false
      },

      facilities: {
        type: Sequelize.STRING,
        allowNull: false
      },

      occasionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        refrences: {
          model: 'Occasions',
          key: 'id',
          as: 'occasionId'
        }
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        refrences: {
          model: 'Users',
          key: 'id',
          as: 'userId'
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
  down: queryInterface => queryInterface.dropTable('Centers')
};

