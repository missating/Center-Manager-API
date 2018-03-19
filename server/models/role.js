export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        args: true,
        msg: 'Title cannot be empty'
      }
    }
  });

  Role.associate = (models) => {
    // associations defined here
    Role.hasMany(
      models.User,
      { foreignKey: 'roleId', onDelete: 'CASCADE' }
    );
  };
  return Role;
};

