export default (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    centerImage: {
      type: DataTypes.STRING,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false
    },

    facilities: {
      type: DataTypes.TEXT,
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

