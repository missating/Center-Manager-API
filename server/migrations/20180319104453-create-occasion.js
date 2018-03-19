module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Occasion', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    title: {
      type: Sequelize.STRING,
      allownull: false
    },

    type: {
      type: Sequelize.STRING,
      allownull: false
    },

    date: {
      type: Sequelize.STRING,
      allownull: false
    },

    time: {
      type: Sequelize.STRING,
      allownull: false
    },

    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },

    centerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Center',
        key: 'id',
        as: 'centerId'
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
  down: queryInterface => queryInterface.dropTable('Occasion'),

};

