module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty'
        }
      }
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Location cannot be empty'
        }
      }
    },

    facilities: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Facilities cannot be empty'
        }
      }
    },

    occasionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Center.associate = (models) => {
    // associations defined here
    Center.belongsTo(models.User, {
      foreignKey: 'userId', onDelete: 'CASCADE'
    });
    Center.hasMany(models.Occasion, {
      foreignKey: 'centerId', onDelete: 'CASCADE'
    });
  };
  return Center;
};

