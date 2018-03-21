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
      allowNull: false
    },

    type: {
      type: Sequelize.STRING,
      allowNull: false
    },

    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },

    time: {
      type: Sequelize.TIME,
      allowNull: false
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

