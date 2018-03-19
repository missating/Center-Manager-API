module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Center', {
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
        refrences: {
          model: 'Occasion',
          key: 'id',
          as: 'occasionId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      userId: {
        type: Sequelize.INTEGER,
        refrences: {
          model: 'User',
          key: 'id',
          as: 'userId'
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
  down: queryInterface => queryInterface.dropTable('Center')
};

