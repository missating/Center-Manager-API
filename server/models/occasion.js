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
        message: 'Type cannot be empty'
      }
    },

    date: {
      types: DataTypes.STRING,
      allowNull: false,
      validate: {
        args: true,
        message: 'Date cannot be empty'
      }
    },

    time: {
      types: DataTypes.STRING,
      allowNull: false,
      validate: {
        args: true,
        message: 'Time cannot be empty'
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

