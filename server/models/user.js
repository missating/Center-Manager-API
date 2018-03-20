import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', {
      fullname: {
        type: DataTypes.STRING,
        allownull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Fullname cannot be empty'
          }
        }
      },

      username: {
        type: DataTypes.STRING,
        unique: true,
        allownull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Username cannot be empty'
          }
        }
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          args: true,
          message: 'Email cannot be empty'
        },
        isEmail: {
          msg: 'Email is invalid'
        }
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password cannot be empty'
          }
        }
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

