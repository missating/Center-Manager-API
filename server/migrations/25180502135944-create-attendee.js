module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Attendees', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    numberOfSeats: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },

    going: {
      type: Sequelize.STRING,
      allowNull: false
    },

    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    },

    occasionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Occasions',
        key: 'id',
        as: 'occasionId'
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
  down: queryInterface => queryInterface.dropTable('Attendees'),
};
