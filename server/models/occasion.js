export default (sequelize, DataTypes) => {
  const Occasion = sequelize.define('Occasion', {
    title: {
      type: DataTypes.STRING,
      allownull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        }
      }
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        args: true,
        msg: 'Type cannot be empty'
      }
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        args: true,
        msg: 'Date cannot be empty'
      }
    },

    time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        args: true,
        msg: 'Time cannot be empty'
      }
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    centerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Occasion.associate = (models) => {
    // associations defined here
    Occasion.belongsTo(models.User, {
      foreignKey: 'userId', onDelete: 'CASCADE'
    });
    Occasion.belongsTo(models.Center, {
      foreignKey: 'centerId', onDelete: 'CASCADE'
    });
  };
  return Occasion;
};

