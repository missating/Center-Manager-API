import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', {
      profileImage: {
        type: DataTypes.STRING,
        allowNull: false,
        // eslint-disable-next-line
        defaultValue: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1521588039/profile-icon-9_njp1mb.png'
      },

      fullname: {
        type: DataTypes.STRING,
        allowNull: false
      },

      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
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

