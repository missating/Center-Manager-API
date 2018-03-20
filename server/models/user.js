import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', {
      fullname: {
        type: DataTypes.STRING,
        allownull: false
      },

      username: {
        type: DataTypes.STRING,
        unique: true,
        allownull: false
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      },

      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2
      }
    },

    {
      hooks: {
        beforeCreate: (user) => {
          user.password = bcrypt.hashSync(user.password, 10);
        }
      }
    }
  );

  User.associate = (models) => {
    // associations defined here
    User.hasMany(
      models.Occasion,
      { foreignKey: 'userId', onDelete: 'CASCADE' }
    );
    User.hasMany(models.Center, { foreignKey: 'userId' });
    User.belongsTo(models.Role, {
      foreignKey: 'roleId'
    });
  };
  return User;
};

