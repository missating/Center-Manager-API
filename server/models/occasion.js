export default (sequelize, DataTypes) => {
  const Occasion = sequelize.define('Occasion', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    time: {
      type: DataTypes.TIME,
      allowNull: false
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

