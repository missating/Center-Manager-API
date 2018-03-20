module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Occasions', {
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
      type: Sequelize.DATEONLY,
      allownull: false
    },

    time: {
      type: Sequelize.TIME,
      allownull: false
    },

    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },

    centerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Centers',
        key: 'id',
        as: 'centerId'
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
  down: queryInterface => queryInterface.dropTable('Occasions'),

};

