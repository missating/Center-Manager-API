export default (sequelize, DataTypes) => {
  const Occasion = sequelize.define('Occasion', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    date: {
      type: DataTypes.STRING,
      allowNull: false
    },

    time: {
      type: DataTypes.STRING,
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
    Occasion.belongsToMany(
      models.User,
      { through: models.Attendee, as: 'attendees', foreignKey: 'occasionId' }
    );
  };
  return Occasion;
};

